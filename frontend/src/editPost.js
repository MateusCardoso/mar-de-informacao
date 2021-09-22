import React, {useState, useEffect, useCallback} from 'react'
import {
  Header,
  Segment,
  Image,
  Grid
} from 'semantic-ui-react'

import { useParams } from 'react-router';

function EditPost(){

    const [post, setPost] = useState({
        postId: null,
        title: '',
        description: '',
        beachReport: {
            waterQuality: '',
            temperature: '',
                windStatus: {
                windDirection: '',
                windVelocity: ''
            }
        }
    });

    const [links, setLinks] = useState({
        links: []
    });

    const [tags, setTags] = useState({
        tags: []
    });
    
    let {postId} = useParams();
    const retrievePost = useCallback(async ()=>{
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/posts/'+postId, requestOptions);
        const data = await response.json();
        setPost(data);
    }, [postId]);

    const retrieveLinks = useCallback(async ()=>{
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/posts/'+postId+'/links', requestOptions);
        const data = await response.json();
        setLinks({links: data});
    }, [postId]);

    const retrieveTags = useCallback(async ()=>{
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/posts/'+postId+'/tags', requestOptions);
        const data = await response.json();
        setTags({tags: data});
    }, [postId]);
    
    useEffect(()=>{
        retrievePost(),
        retrieveLinks(),
        retrieveTags();
    }, [retrievePost]);

    return <div>
            
        </div>;
}

export default EditPost
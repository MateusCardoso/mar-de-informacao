import React, {useState, useEffect, useCallback} from 'react'
import {
    Form,
    Grid,
    Header,
    Segment
  } from 'semantic-ui-react'

import { useParams } from 'react-router';

import PostText from './postText'
import SavePostButton from './savePostButton'
import BeachReport from './beachReport'
import WindStatus from './windStatus'
import LinkTable from './linkTable'
import TagMultiselect from './tagMultiselect'

function EditPost(){

    const [post, setPost] = useState({
        id: null,
        title: '',
        description: '',
        beachReport: {
            id: null,
            waterQuality: '',
            temperature: '',
                windStatus: {
                id: null,
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

    const updatePostText = (name, value) => {
        var updatedState = post;
        updatedState[name] = value;
        setPost(updatedState);
    }
    
    const updateBeachReport = (name,value) => {
        var updatedState = post;
        updatedState.beachReport[name] = value;
        setPost(updatedState);
    }
    
    const updateWindStatus = (name,value) => {
        var updatedState = post;
        updatedState.beachReport.windStatus[name] = value;
        setPost(updatedState);
    }
    
    const updateLinksTable = (links) => {
        setLinks({links: links});
    }
    
    const updateTagsList = (tags) => {
        setTags({tags: tags});
    }

    return <div>
        <Segment padded='very' inverted color='grey'>
          <Header as='h1'>Entrar novo Post</Header>
        </Segment>
        <Form>
          <Grid columns={2} stackable>
            <PostText updatePostText={updatePostText}></PostText>
            <BeachReport updateBeachReport={updateBeachReport}></BeachReport>
            <WindStatus updateWindStatus={updateWindStatus}></WindStatus>
            <TagMultiselect updateTagsList={updateTagsList} allowAdditions={true}></TagMultiselect>
            <LinkTable links={links.links} postId={post.id}></LinkTable>
            <SavePostButton
              postId={post.id}
              title={post.title}
              description={post.description}
              beachReport={post.beachReport}
              windStatus={post.beachReport.windStatus}
              links={links.links}
              tags={tags.tags}
              updateLinksTable={updateLinksTable}
            >
            </SavePostButton>
            
          </Grid>
        </Form>
    </div>;
}

export default EditPost
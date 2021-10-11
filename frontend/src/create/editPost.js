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
import TagMultiselect from '../common/tagMultiselect'
import PublishPostButton from './publishPostButton';

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

    const [links, setLinks] = useState([]);
    const [tags, setTags] = useState([]);
    
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
        setLinks(data);
    }, [postId]);

    const retrieveTags = useCallback(async ()=>{
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/posts/'+postId+'/tags', requestOptions);
        const data = await response.json();
        setTags(data);
    }, [postId]);
    
    useEffect(()=>{
        retrievePost(),
        retrieveLinks(),
        retrieveTags();
    }, [retrievePost]);

    const updatePostText = (name,value) => {
        setPost({
            ...post, 
            [name]: value
        })
    }
    
    const updateBeachReport = (name,value) => {
        setPost({
            ...post, 
            beachReport: { 
                ...post.beachReport,
                [name]:value 
            }
        })
    }
    
    const updateWindStatus = (name,value) => {
        setPost({
            ...post, 
            beachReport: { 
                ...post.beachReport,
                windStatus: {
                    ...post.beachReport.windStatus,
                    [name]:value
                }
                
            }
        })
    }
    
    const updateLinksTable = (links) => {
        setLinks(links);
    }
    
    const updateTagsList = (tags) => {
        setTags(tags);
    }

    return <div>
        <Segment padded='very' inverted color='grey'>
          <Header as='h1'>Entrar novo Post</Header>
        </Segment>
        <Form>
          <Grid columns={2} stackable doubling>
            <PostText updatePostText={updatePostText}           post={post}></PostText>
            <BeachReport updateBeachReport={updateBeachReport}  beachReport={post.beachReport}></BeachReport>
            <WindStatus updateWindStatus={updateWindStatus}     windStatus={post.beachReport.windStatus}></WindStatus>
            <TagMultiselect updateTagsList={updateTagsList}     tags={tags} allowAdditions={true}></TagMultiselect>
            <LinkTable updateLinksTable={updateLinksTable}      links={links} postId={post.id}></LinkTable>
            <Grid.Row>
                <SavePostButton
                    post={post}
                    links={links}
                    tags={tags}
                    updateLinksTable={updateLinksTable}
                />
                <PublishPostButton 
                    post={post}
                    links={links}
                    tags={tags}
                    updateLinksTable={updateLinksTable}
                />
            </Grid.Row>
          </Grid>
        </Form>
    </div>;
}

export default EditPost
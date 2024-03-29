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
import { apps } from '../common/fieldLabel';
import FindingReport from './findingReport';
import CoverImageUpload from './coverImageUpload';

function EditPost(){

    const [post, setPost] = useState({
        id: null,
        title: '',
        description: '',
        beachReport: {
            id: null,
            waterQuality: '',
            temperature: '',
            rainVolume: '',
            fishCatched: '',
            fishQuantity: '',
            windStatus: {
                id: null,
                windDirection: '',
                windVelocity: ''
            }
        },
        findingReport: {
            id: null,
            animalName: '',
            animalSpecies: '',
            garbageOrigin: '',
            garbageQuantity: ''
        }
    });
    const [images, setImages] = useState([{
        id: null,
        category: '',
        uploadRequired: false,
        deleteRequired: false,
        content: null,
        localURL: null
    }]);
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

    const retrieveImages = useCallback(async ()=>{
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/posts/'+postId+'/images', requestOptions);
        const data = await response.json();
        
        const savedImages = await Promise.all(data.map( async (image) => {
            const response = await fetch(process.env.REACT_APP_API_URL+'/images/'+image.id, requestOptions);
            const responseImage = await response.blob();
            return {
                ...image,
                uploadRequired: false,
                deleteRequired: false,
                content: responseImage,
                localURL: URL.createObjectURL(responseImage)
            }
        }));
        setImages(savedImages);
    }, [postId]);
    
    useEffect(()=>{
        retrievePost(),
        retrieveLinks(),
        retrieveTags(),
        retrieveImages();
    }, [postId]);

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

    const updateFindingReport = (name,value) => {
        setPost({
            ...post, 
            findingReport: { 
                ...post.findingReport,
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

    const updateImage = (image) => {
        const allImages = images.slice();
        const imageIndex = images.findIndex(x => x.id === image.id);
        if(image.deleteRequired === true){
            allImages.splice(imageIndex, 1);
        }else{
            if(imageIndex !== -1){
                allImages[imageIndex] = image;
            }else{
                allImages.push(image);
            }
        }
        setImages(allImages);
    }

    return <div>
        <Segment padded='very' inverted color='grey'>
          <Header as='h1'>{apps.createHeader}</Header>
        </Segment>
        <Form>
            <Segment vertical secondary textAlign='right'>
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
            </Segment>
            <Grid padded='vertically' columns={2} stackable doubling>
                <PostText updatePostText={updatePostText} post={post}/>
                <CoverImageUpload updateImage={updateImage} postId={post.id} image={images.find(x => x.category === 'M')}/>
                <TagMultiselect updateTagsList={updateTagsList} tags={tags} allowAdditions={true}/>
                <WindStatus updateWindStatus={updateWindStatus} windStatus={post.beachReport.windStatus}/>
                <BeachReport updateBeachReport={updateBeachReport} beachReport={post.beachReport}/>
                <FindingReport updateFindingReport={updateFindingReport} findingReport={post.findingReport} updateImage={updateImage} postId={post.id} images={images.filter(x => x.category !== 'M')}/>
                <LinkTable updateLinksTable={updateLinksTable}  links={links} postId={post.id}/>
            </Grid>
        </Form>
    </div>;
}

export default EditPost
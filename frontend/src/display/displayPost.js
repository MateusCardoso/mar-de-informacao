import React, {useState, useEffect, useCallback} from 'react'
import {
  Header,
  Segment,
  Image,
  Grid
} from 'semantic-ui-react'

import { useParams } from 'react-router';

import DisplayLinks from './displayLinks';
import HeaderFragment from './headerFragment';
import BeachReportFragment from './beachReportFragment';
import WindStatusFragment from './windStatusFragment';
import PrecipitationFragment from './precipitationFragment';
import FishingFragment from './fishingFragment';
import EditPostButton from './editPostButton';
import { apps, sectionHeaders } from '../common/fieldLabel';
import FindingReportFragment from './findingReportFragment';

function DisplayPost(){

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
        },
        findingReport: {
            animalName: '',
            animalSpecies: '',
            garbageOrigin: '',
            garbageQuantity: ''
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

    return <div>
            <Segment padded='very' inverted color='grey'>
                <Header as='h1'>{apps.displayHeader}</Header>
            </Segment>
            <Segment>
                <Segment vertical secondary textAlign='right'>
                    <EditPostButton postId={postId}/>
                </Segment>
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <Segment basic >
                            <Image size='big' src={'/images/placeholder.png'}></Image>
                            
                        </Segment>
                    </Grid.Column>
                    <HeaderFragment post={post} tags={tags}/>
                    <BeachReportFragment beachReport={post.beachReport}/>
                    <WindStatusFragment windStatus={post.beachReport.windStatus}/>
                    <PrecipitationFragment beachReport={post.beachReport}/>
                    <FishingFragment beachReport={post.beachReport}/>
                </Grid>
            </Segment>
            <FindingReportFragment findingReport={post.findingReport}/>
            { links.length ?
                <Segment>
                    <Header as='h3'>{sectionHeaders.linksSection}:</Header>
                    <DisplayLinks links={links}></DisplayLinks>
                </Segment>
                : null
            }
        </div>;
}

export default DisplayPost
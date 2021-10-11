import React, {useState, useEffect, useCallback} from 'react'
import {
  Header,
  Segment,
  Image,
  Grid
} from 'semantic-ui-react'

import { useParams } from 'react-router';

import DisplayLinks from './displayLinks';
import DisplayTags from './displayTags';

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
                <Header as='h1'>Posts Museu do Mar</Header>
            </Segment>
            <Segment>
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <Segment basic >
                            <Image size='big' src={'/images/placeholder.png'}></Image>
                            
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic>
                            <Header as='h1'>{post.title}</Header>
                            {post.description}
                            { tags.length ?
                                <Segment basic>Tags: 
                                    <DisplayTags tags={tags}></DisplayTags>
                                </Segment>
                                : null
                            }
                        </Segment>
                    </Grid.Column>
                    {   post.beachReport.waterQuality !== null  && post.beachReport.temperature !== null ?
                        <Grid.Column>
                            <Segment basic>
                                <Header as='h3'>Situaçao do Mar</Header>
                                <Segment>
                                    { post.beachReport.waterQuality ?
                                        <Segment basic>
                                            Transparencia da Agua: {post.beachReport.waterQuality}
                                        </Segment>
                                        : null
                                    }

                                    <Segment basic>
                                        Intensidade da Mare:
                                    </Segment>
                                    
                                    { post.beachReport.temperature ?
                                        <Segment basic>
                                            Temperatura: {post.beachReport.temperature} ºC
                                        </Segment>    
                                        : null 
                                    }
                                </Segment>
                            </Segment>
                        </Grid.Column>
                        : null
                    }
                    {   post.beachReport.windStatus.windDirection !== null && post.beachReport.windStatus.windVelocity !== null ?
                        <Grid.Column>
                            <Segment basic>
                                <Header as='h3'>Situaçao do Vento</Header>
                                <Segment>
                                    { post.beachReport.windStatus.windDirection ?
                                        <Segment basic>
                                            Direçao do Vento: {post.beachReport.windStatus.windDirection}
                                        </Segment>
                                        : null 
                                    }
                                    {   post.beachReport.windStatus.windVelocity ?
                                        <Segment basic>
                                            Velocidade do Vento: {post.beachReport.windStatus.windVelocity} Km/h
                                        </Segment>
                                        : null
                                    }
                                </Segment>
                            </Segment>
                        </Grid.Column>
                        : null
                    }
                    <Grid.Column>
                        <Segment basic>
                            <Header as='h3'>Precipitaçao</Header>
                            <Segment>
                                <Segment basic>
                                    Quantidade de chuva (mm):
                                </Segment>
                            </Segment>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic>
                            <Header as='h3'>Pescaria</Header>
                            <Segment>
                                <Segment basic>
                                    Especie mais capturada:
                                </Segment>
                                <Segment basic>
                                    Quantidade (Kg):
                                </Segment>
                            </Segment>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <Header as='h3'>Animais Encontrados</Header>
                        <Segment>
                            <Segment basic>
                                Especies:
                            </Segment>
                            <Segment basic>
                                Fotos:
                            </Segment>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h3'>Lixo</Header>
                            <Segment>
                                <Segment basic>
                                    Quantidade de Lixo (Kg):
                                </Segment>
                                <Segment basic>
                                    Origem:
                                </Segment>
                                <Segment basic>
                                    Fotos:
                                </Segment>
                            </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
            { links.length ?
                <Segment>
                    <Header as='h3'>Links:</Header>
                    <DisplayLinks links={links}></DisplayLinks>
                </Segment>
                : null
            }
        </div>;
}

export default DisplayPost
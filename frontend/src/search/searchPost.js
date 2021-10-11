import React, {useState, useEffect} from 'react'
import {
  Header,
  Segment,
  Table,
  Grid
} from 'semantic-ui-react'

import moment from 'moment';

import TagMultiselect from '../common/tagMultiselect';
import FindPostsButton from './findPostsButton';
import SearchColumnsButton from './searchColumnsButton';
import SearchHeaderColumns from './searchHeaderColumns';

function SearchPost () {

    const [posts,setPosts] = useState([]);
    const [tags,setTags] = useState([]);
    const [columns,setColumns] = useState([]);
    const [orderedBy,setOrderedBy] = useState({
        field: '',
        order: '',
        tableOrder: ''
    });

    useEffect(() => {
        getAllPosts()
    }, [orderedBy]);

    const getAllPosts = async () => {
        const requestOptions = {
            method: 'GET'
        };
        const response = orderedBy.field !== '' 
            ? await fetch(process.env.REACT_APP_API_URL+'/posts/orderedBy?field='+orderedBy.field+'&order='+orderedBy.order, requestOptions) 
            : await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
        const data = await response.json();
        var posts = [];
        for(const post of data){
            posts.push({
                id: post.id,
                title: post.title,
                description: post.description,
                waterQuality: post.beachReport.waterQuality,
                temperature: post.beachReport.temperature,
                windDirection: post.beachReport.windStatus.windDirection,
                windVelocity: post.beachReport.windStatus.windVelocity,
                publicationDateTime: post.publicationDateTime ? moment(parseDate(post.publicationDateTime)).format('DD MMM, YYYY - HH:mm:ss' ) : null
            })
        }
        setPosts(posts);
    }

    const parseDate = (publicationDateTime) => {
        return ({
            year:   publicationDateTime[0],
            month:  publicationDateTime[1]-1,
            day:    publicationDateTime[2],
            hour:   publicationDateTime[3],
            minute: publicationDateTime[4],
            second: publicationDateTime[5],
        })
    }

    const renderFilters = () => {
        return(
        <Grid columns={4}> 
            <TagMultiselect updateTagsList={setTags} allowAdditions={false} noHeader={true} tags={tags}></TagMultiselect>
        </Grid>
        )
    }

    const renderPosts = () => {
        return(
            posts.map((post)=>
                <Table.Row key={post.id}>
                    <Table.Cell selectable>
                        <a href={"/Display/" + post.id}>{post.title}</a>
                    </Table.Cell>
                    <Table.Cell content={post.description}></Table.Cell>
                    {renderColumns(post)}
                </Table.Row>
        ))
    }

    const renderColumns = (post) => {
        return(
            columns.map((column)=>
                <Table.Cell key={columns.indexOf(column)} content={post[column.columnTechnicalName]}></Table.Cell>   
        ))
    }

    return  <div>
                <Segment padded='very' inverted color='grey'>
                    <Header as='h1' content='Buscar Posts' textAlign='left' />
                </Segment>
                <Segment fluid='true'>
                    <Header as='h4' content='Filtros:' textAlign='left' />
                    {renderFilters()}
                    <Segment vertical>
                        <FindPostsButton
                            tags={tags}
                            updatePostsList={setPosts}
                            resetPostList={getAllPosts}
                        >
                        </FindPostsButton>
                    </Segment>

                </Segment>
                <Segment>
                    <Segment vertical secondary textAlign='right'>
                        <SearchColumnsButton columns={columns} updateColumns={setColumns}/>
                    </Segment>
                    <Table sortable>
                        <SearchHeaderColumns columns={columns} orderedBy={orderedBy} setOrderedBy={setOrderedBy}/>
                        <Table.Body children>
                            {renderPosts()}
                        </Table.Body>

                    </Table>
                </Segment>
            </div>
};

export default SearchPost;
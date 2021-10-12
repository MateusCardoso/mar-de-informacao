import React, {useState, useEffect} from 'react'
import {
  Header,
  Segment,
  Table,
  Grid
} from 'semantic-ui-react'

import TagMultiselect from '../common/tagMultiselect';
import FindPostsButton from './findPostsButton';
import SearchColumnsButton from './searchColumnsButton';
import SearchHeaderColumns from './searchHeaderColumns';

import RetrievePosts from './retrievePosts';

function SearchPost () {

    const [posts,setPosts] = useState([]);
    const [tags,setTags] = useState([]);
    const [columns,setColumns] = useState([]);
    const [orderedBy,setOrderedBy] = useState({
        entity: '',
        field: '',
        order: '',
        tableOrder: ''
    });

    useEffect(() => {
        getPosts();
    }, [orderedBy]);

    const getPosts = async () => {
        const tagIds = await getTagIds();
        await RetrievePosts({
            setPosts: setPosts,
            orderedBy: orderedBy,
            filters: tagIds
                    ? [{
                        name: 'tagIds',
                        value: tagIds
                    }] : null
        })
    }

    const getTagIds = async () => {
        var tagIds = [];
        for(const tag of tags){
            tagIds.push(tag.id);
        }
        return(tagIds.join());
    };
    
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
                            getPosts={getPosts}
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
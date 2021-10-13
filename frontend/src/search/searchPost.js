import React, {useState, useEffect} from 'react'
import {
  Header,
  Segment,
  Table
} from 'semantic-ui-react'

import SearchColumnsButton from './searchColumnsButton';
import SearchHeaderColumns from './searchHeaderColumns';
import RetrievePosts from './retrievePosts';
import FilterBar from './filterBar';

function SearchPost () {

    const [posts,setPosts] = useState([]);
    const [tags,setTags] = useState([]);
    const [dateRange, setDateRange] = useState([]);
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
            filters: [
                    {   name: 'tagIds',
                        value: tagIds 
                    },
                    {   name: 'date',
                        value: dateRange 
                    }
                    ]
        })
    }

    const getTagIds = async () => {
        var tagIds = [];
        for(const tag of tags){
            tagIds.push(tag.id);
        }
        return(tagIds.join());
    };

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
                <FilterBar
                    tags={tags}
                    setTags={setTags}
                    date={dateRange}
                    setDateRange={setDateRange}
                    getPosts={getPosts}
                />
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
import React from 'react'
import {
  Header,
  Segment,
  Table,
  Grid,
  Button
} from 'semantic-ui-react'

import TagMultiselect from './tagMultiselect';
import FindPostsButton from './findPostsButton';
import fieldLabels from './fieldLabel';
import SearchColumnsButton from './searchColumnsButton';

class SearchPost extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            tags: [],
            columns: []
        }
        this.updateTagsList = this.updateTagsList.bind(this);
        this.updatePostsList = this.updatePostsList.bind(this);
        this.updateColumnsList = this.updateColumnsList.bind(this);
        this.renderHeaderColumns = this.renderHeaderColumns.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
        this.getAllPosts = this.getAllPosts.bind(this);
    }

    async componentDidMount() {
        const posts = await this.getAllPosts();
        this.setState({
            posts: posts
        });
    }

    async getAllPosts(){
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
        const data = await response.json();
        var posts = [];
        for(const post of data){
            posts.push({
                id: post.id,
                description: post.description,
                waterQuality: post.beachReport.waterQuality,
                temperature: post.beachReport.temperature,
                windDirection: post.beachReport.windStatus.windDirection,
                windVelocity: post.beachReport.windStatus.windVelocity
            })
        }
        return(posts);
    }

    updateTagsList(tags){
        this.setState({tags: tags});
    }

    updatePostsList(posts){
        this.setState({posts: posts});
    }

    updateColumnsList(columns){
        this.setState({columns: columns})
    }

    renderFilters(){
        return(
        <Grid columns={4}> 
            <TagMultiselect updateTagsList={this.updateTagsList} allowAdditions={false} noHeader={true}></TagMultiselect>
        </Grid>
        )
    }

    renderPosts(posts){
        return(
            posts.map((post)=>
                <Table.Row key={post.id}>
                    <Table.Cell content={post.id}></Table.Cell>
                    <Table.Cell content={post.description}></Table.Cell>
                    {this.renderColumns(post)}
                </Table.Row>
        ))
    }

    renderHeaderColumns(){
        return(
            this.state.columns.map((column)=>
                <Table.HeaderCell key={this.state.columns.indexOf(column)} content={column.columnName}></Table.HeaderCell>   
        ))
    }

    renderColumns(post){
        return(
            this.state.columns.map((column)=>
                <Table.Cell key={this.state.columns.indexOf(column)} content={post[column.columnTechnicalName]}></Table.Cell>   
        ))
    }

    render(){
        return(
            <div>
                <Segment padded='very' inverted color='grey'>
                    <Header as='h1' content='Buscar Posts' textAlign='left' />
                </Segment>
                <Segment fluid='true'>
                    <Header as='h4' content='Filtros:' textAlign='left' />
                    {this.renderFilters()}
                    <Segment vertical>
                        <FindPostsButton
                            tags={this.state.tags}
                            updatePostsList={this.updatePostsList}
                            resetPostList={this.getAllPosts}
                        >
                        </FindPostsButton>
                    </Segment>

                </Segment>
                <Segment>
                    <Segment vertical secondary textAlign='right'>
                        <SearchColumnsButton
                            updateColumns={this.updateColumnsList}
                        >
                        </SearchColumnsButton>
                    </Segment>
                    <Table selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>{fieldLabels.postTitle}</Table.HeaderCell>
                                <Table.HeaderCell>{fieldLabels.postDescription}</Table.HeaderCell>
                                {this.renderHeaderColumns()}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body children>
                            {this.renderPosts(this.state.posts)}
                        </Table.Body>

                    </Table>
                </Segment>
            </div>
        );
    }
}

export default SearchPost
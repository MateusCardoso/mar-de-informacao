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

class SearchPost extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            tags: []
        }
        this.updateTagsList = this.updateTagsList.bind(this);
        this.updatePostsList = this.updatePostsList.bind(this);
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

    renderFilters(){
        return(
        <Grid columns={4}> 
            <TagMultiselect updateTagsList={this.updateTagsList} allowAdditions={false} noHeader={true}></TagMultiselect>
        </Grid>
        )
    }

    renderPosts(props){
        const posts = props;
        return(
            posts.map((post)=>
                <Table.Row>
                    <Table.Cell content={post.id}></Table.Cell>
                    <Table.Cell content={post.description}></Table.Cell>
                    <Table.Cell content={post.waterQuality}></Table.Cell>
                    <Table.Cell content={post.temperature}></Table.Cell>
                    <Table.Cell content={post.windDirection}></Table.Cell>
                    <Table.Cell content={post.windVelocity}></Table.Cell>
                </Table.Row>
        ))
    }

    render(){
        return(
            <div>
                <Segment padded='very' inverted color='grey'>
                    <Header as='h1' content='Buscar Posts' textAlign='left' />
                </Segment>
                <Segment fluid>
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
                    <Table selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>{fieldLabels.postTitle}</Table.HeaderCell>
                                <Table.HeaderCell>{fieldLabels.postDescription}</Table.HeaderCell>
                                <Table.HeaderCell>{fieldLabels.waterQuality}</Table.HeaderCell>
                                <Table.HeaderCell>{fieldLabels.temperature}</Table.HeaderCell>
                                <Table.HeaderCell>{fieldLabels.windDirection}</Table.HeaderCell>
                                <Table.HeaderCell>{fieldLabels.windVelocity}</Table.HeaderCell>
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
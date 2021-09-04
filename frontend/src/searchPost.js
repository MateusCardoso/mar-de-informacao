import React from 'react'
import {
  Header,
  Segment,
  Table,
  Grid,
  Button
} from 'semantic-ui-react'

import TagMultiselect from './tagMultiselect';

class SearchPost extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            tags: []
        }
        this.updateTagsList = this.updateTagsList.bind(this);
    }

    async componentDidMount() {
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
        const data = await response.json();
        var posts = [];
        for(const post of data){
            posts.push({
                id: post.id,
                description: post.description
            })
        }
        this.setState({
            posts: posts
        });
    }

    updateTagsList(tags){
        this.setState({tags: tags});
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
                        <Button >Procurar</Button>
                    </Segment>

                </Segment>
                <Segment>
                    <Table selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Titulo do Post</Table.HeaderCell>
                                <Table.HeaderCell>Descriçao do Post</Table.HeaderCell>
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
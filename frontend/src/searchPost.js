import React from 'react'
import {
  Header,
  Pagination,
  Segment,
  Table,
  TableCell
} from 'semantic-ui-react'

class SearchPost extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
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
                <Segment>
                    <Header as='h4' content='Filtros:' textAlign='left' />
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

                        <Table.Footer>
                            <Pagination>

                            </Pagination>
                        </Table.Footer>
                    </Table>
                </Segment>
            </div>
        );
    }
}

export default SearchPost
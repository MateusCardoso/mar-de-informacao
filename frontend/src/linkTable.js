import React from 'react'
import { 
    Grid,
    Header,
    Table,
    Button,
    Icon
} from 'semantic-ui-react';

import Link from './link';

class LinkTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            links: [],
            lastLine: 1
        }

        this.addLink = this.addLink.bind(this);
    }

    renderLinks(props){
        const links = props;
        return(
            links.map((link)=>
                <Link 
                    key={link.tableLine} 
                    tableLine={link.tableLine}
                    linkId={link.linkId}
                    name={link.name}
                    url={link.url}
                ></Link>
        ))
    }

    addLink(){
        var links = this.state.links;
        const lastLine = this.state.lastLine;
        links.push({
            key: lastLine,
            tableLine: lastLine,
            linkId: null,
            name: '',
            url: ''
        });
        this.setState({
            links: links,
            lastLine: lastLine + 1
        });
        this.props.updateLinks(links);
    }

    async componentDidMount() {
        this.setState({
            links: []
        });
      }

    render() {
        return(
        <Grid.Column>
            <Header as='h4' content='Links:' />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nome do Link</Table.HeaderCell>
                            <Table.HeaderCell>URL</Table.HeaderCell>
                            <Table.HeaderCell>Deletar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    
                    <Table.Body children>
                        {this.renderLinks(this.state.links)}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={this.addLink}
                                >
                                <Icon name='world' /> Adicionar Link
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                
            </Table>
        </Grid.Column>
        )
    }
}
 export default LinkTable
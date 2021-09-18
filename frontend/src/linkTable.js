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
            lastLine: 0
        }

        this.addLink = this.addLink.bind(this);
        this.updateLinkData = this.updateLinkData.bind(this);
        this.updatecreateLinkLinkData = this.createLink.bind(this);
    }

    renderLinks(props){
        const links = props;
        return(
            links.map((link)=>
                <Link 
                    key={link.tableLine} 
                    tableLine={link.tableLine}
                    linkId={link.linkId}
                    linkName={link.linkName}
                    url={link.url}
                    updateLinkData={this.updateLinkData}
                ></Link>
        ))
    }

    addLink(){
        var links = this.props.links;
        const lastLine = this.state.lastLine;
        const newLink = {
            linkId: null,
            key: lastLine,
            tableLine: lastLine,
            linkName: '',
            url: ''
        }
        const newLinkId = this.createLink(newLink); 
        newLink.linkId = newLinkId;
        links.push(newLink);
        this.setState({
            lastLine: lastLine + 1
        });
    }

    updateLinkData(tableLine,name,value){
        var linkToUpdate = this.props.links.find(link => link.tableLine === tableLine);
        linkToUpdate[name] = value;
    }

    async createLink(link){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableLine: link.tableLine
            })
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/links/postId='+this.props.postId, requestOptions);
        const data = await response.json();
        return (data.id);
        
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
                        {this.renderLinks(this.props.links)}
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
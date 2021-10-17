import { useState } from 'react';
import { 
    Grid,
    Header,
    Table,
    Button,
    Icon
} from 'semantic-ui-react';
import { buttons, fieldLabels, sectionHeaders } from '../common/fieldLabel';

import Link from './link';

function LinkTable (props){
    
    const [lastLine, setLastLine] = useState(0);
   
    const renderLinks = (x) => {
        const links = x;
        return(
            links.map((link)=>
                <Link
                    key={link.tableLine}
                    link={link} 
                    updateLinkData={updateLinkData}
                ></Link>
        ))
    }

    const addLink = async () => {
        var links = props.links.slice();
        const newLink = {
            id: null,
            linkName: '',
            url: '',
            tableLine: lastLine
        }
        const newLinkId = await createLink(newLink); 
        newLink.id = newLinkId;
        links.push(newLink);
        setLastLine(lastLine + 1);
        props.updateLinksTable(links);
    }

    const updateLinkData = (tableLine,name,value) => {
        var links = props.links.slice();
        var linkToUpdate = links.find(link => link.tableLine === tableLine);
        linkToUpdate[name] = value;
        props.updateLinksTable(links);
    }

    const createLink = async (link) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableLine: link.tableLine
            })
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/links/postId='+props.postId, requestOptions);
        const data = await response.json();
        return (data.id);   
    };

    return  <Grid.Column>
                <Header as='h4' content={sectionHeaders.linksSection} />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>{fieldLabels.linkName}</Table.HeaderCell>
                                <Table.HeaderCell>{fieldLabels.linkURL}</Table.HeaderCell>
                                <Table.HeaderCell>{buttons.deleteLink}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        
                        <Table.Body children>
                            {renderLinks(props.links)}
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
                                        onClick={addLink}
                                    >
                                        <Icon name='world' /> {buttons.addLink}
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>

                    </Table>
            </Grid.Column>
}
 export default LinkTable
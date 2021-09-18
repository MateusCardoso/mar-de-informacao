import React from 'react'
import { List } from 'semantic-ui-react';

class DisplayLinks extends React.Component{

    constructor(props){
        super(props);
        this.renderLinks = this.renderLinks.bind(this);
    }

    renderLinks(){
        var links = this.props.links;
        if(links === undefined){
            return(null)
        }
        else{
            return (
                links.map((link)=>
                <List.Item key={link.tableLine}>
                    <List.Icon name='linkify' />
                    <List.Content>
                        <a href={link.url}>{link.linkName}</a>
                    </List.Content>
                </List.Item>
                )
            )
        }
    }

    render (){
        return(
            <div>
                <List>
                    {this.renderLinks()} 
                </List>

            </div>
        )
    }
}

export default DisplayLinks
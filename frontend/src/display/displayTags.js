import React from 'react'

class DisplayTags extends React.Component{

    constructor(props){
        super(props);
        this.renderTags = this.renderTags.bind(this);
    }

    renderTags(){
        var tags = this.props.tags;
        if(tags === undefined){
            return(null)
        }
        else{
            var tagNames = [];
            for(const tag of tags){
                tagNames.push(tag.tagName);
            }
            return(tagNames.join(', '));
        }
    }

    render (){
        return(
            <div>
                {this.renderTags()} 
            </div>
        )
    }
}

export default DisplayTags
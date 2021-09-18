import React from 'react'
import { 
    Grid,
    Header,
    Form,
    Label,
    Dropdown
} from 'semantic-ui-react';

class TagMultiselect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTags: [],
            options: []
        }

        this.selectTag = this.selectTag.bind(this);
        this.addTag = this.addTag.bind(this);
    }

    async componentDidMount() {
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/tags', requestOptions);
        const data = await response.json();
        var options = [];
        for(const tag of data){
            options.push({
                id: tag.id,
                text: tag.tagName,
                value: tag.tagName
            })
        }
        this.setState({
            options: options
        });
    }

    selectTag(evt){
        if(evt.target.attributes.role !== undefined && evt.target.attributes.role.nodeValue === 'option'){
            const options = this.state.options;
            const targetId = Number(evt.target.id);
            const tagWithId = options.find(x => x.id === targetId );
            if(tagWithId !== undefined){
                this.state.selectedTags.push({
                    tagId: tagWithId.id,
                    tagName: tagWithId.value
                });
            }
        }else if(evt.target.parentNode.attributes.role !== undefined && evt.target.parentNode.attributes.role.nodeValue === 'option'){
            const options = this.state.options;
            const targetId = Number(evt.target.parentNode.id);
            const tagWithId = options.find(x => x.id === targetId );
            if(tagWithId !== undefined){
                this.state.selectedTags.push({
                    tagId: tagWithId.id,
                    tagName: tagWithId.value
                });
            }
        }else if(evt.target.className === 'dropdown icon clear'){
            this.state.selectedTags = [];
        }else if(evt.target.className === 'delete icon'){
            const tagName = evt.target.parentNode.innerText;
            const currentTags = this.state.selectedTags;
            this.state.selectedTags = currentTags.filter(x => x.tagName !== tagName);
        }
        this.props.updateTagsList(this.state.selectedTags);
    }

    async addTag(_evt,data){
        var newTag = {
            tagId: null,
            tagName: data.value
        };
        newTag.tagId = await this.createTag(newTag);
        this.state.options.push({
            id: newTag.tagId,
            text: data.value,
            value: data.value
        });
        this.state.selectedTags.push(newTag);
        this.props.updateTagsList(this.state.selectedTags);
    }

    async createTag(tag){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tagName: tag.tagName
            })
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/tags', requestOptions);
        const data = await response.json();
        return (data.id);  
    }

    renderHeader(){
        if(this.props.noHeader !== true){
            return(
                <Header as='h4' content='Categoria do Post:' textAlign='left'/>
            )
        }
    }

    render() {
        return(
        <Grid.Column>
            {this.renderHeader()}
            <Form.Field>
                <Label>Tags de Busca</Label>
                <Dropdown
                    allowAdditions={this.props.allowAdditions}
                    clearable
                    fluid
                    multiple
                    search
                    selection
                    options={this.state.options}
                    onAddItem={this.addTag}
                    onChange={this.selectTag}
                    placeholder='Tags...'
                />
            </Form.Field>
        </Grid.Column>
        )
    }
}
 export default TagMultiselect
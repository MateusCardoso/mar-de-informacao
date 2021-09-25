import { useCallback, useEffect, useState } from 'react';
import { 
    Grid,
    Header,
    Form,
    Label,
    Dropdown
} from 'semantic-ui-react';

function TagMultiselect (props) {
    
    const [options, setOptions] = useState([]);
    
    const retrieveOptions = useCallback( async () => {
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/tags', requestOptions);
        const data = await response.json();
        var retrieved = data.map((tag) => ({
            id: tag.id,
            text: tag.tagName,
            value: tag.tagName
        }));
        setOptions(retrieved);
    });

    useEffect(()=>{
        retrieveOptions()
    }, []);

    const selectTag = (evt) => {
        var selectedTags = props.tags.slice();
        if(evt.target.attributes.role !== undefined && evt.target.attributes.role.nodeValue === 'option'){
            const targetId = Number(evt.target.id);
            const tagWithId = options.find(x => x.id === targetId );
            if(tagWithId !== undefined){
                selectedTags.push({
                    id: tagWithId.id,
                    tagName: tagWithId.value
                });
            }
        }else if(evt.target.parentNode.attributes.role !== undefined && evt.target.parentNode.attributes.role.nodeValue === 'option'){
            const targetId = Number(evt.target.parentNode.id);
            const tagWithId = options.find(x => x.id === targetId );
            if(tagWithId !== undefined){
                selectedTags.push({
                    id: tagWithId.id,
                    tagName: tagWithId.value
                });
            }
        }else if(evt.target.className === 'dropdown icon clear'){
            selectedTags = [];
        }else if(evt.target.className === 'delete icon'){
            const tagName = evt.target.parentNode.innerText;
            const currentTags = selectedTags;
            selectedTags = currentTags.filter(x => x.tagName !== tagName);
        }
        props.updateTagsList(selectedTags);
    };

    const addTag = async (_evt,data) => {
        var newTag = await createTag(data.value);
        
        var newOptions = options.slice();
        newOptions.push({
            id: newTag.id,
            text: data.value,
            value: data.value
        });
        setOptions(newOptions);
        
        var selectedTags = props.tags.slice();
        selectedTags.push(newTag);
        props.updateTagsList(selectedTags);
    };

    const createTag = async (tagName) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tagName: tagName
            })
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/tags', requestOptions);
        const data = await response.json();
        return (data);  
    }

    const renderHeader = () => {
        if(props.noHeader !== true){
            return(
                <Header as='h4' content='Categoria do Post:' textAlign='left'/>
            )
        }
    };

    return  <Grid.Column>
                {renderHeader()}
                <Form.Field>
                    <Label>Tags de Busca</Label>
                    <Dropdown
                        allowAdditions={props.allowAdditions}
                        clearable
                        fluid
                        multiple
                        search
                        selection
                        options={options}
                        value={props.tags.map((tag) => tag.tagName)}
                        onAddItem={addTag}
                        onChange={selectTag}
                        placeholder='Tags...'
                    />
                </Form.Field>
            </Grid.Column>
}
 export default TagMultiselect
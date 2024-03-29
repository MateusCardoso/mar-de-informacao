import { useCallback, useEffect, useState } from 'react';
import { 
    Grid,
    Header,
    Form,
    Label,
    Dropdown
} from 'semantic-ui-react';

import { fieldLabels, placeholders, sectionHeaders } from './fieldLabel';

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

    const selectTag = (_evt,data) => {
        const selectedTags = data.value.reduce((result, value) => {
            const option = options.find(x => x.value === value )
            if(option !== undefined){
                result.push({
                    id: option.id,
                    tagName: option.value
                })
            }
            return result;
        }, []);
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
                <Header as='h4' content={sectionHeaders.postCategory} textAlign='left'/>
            )
        }
    };

    return  <Grid.Column>
                {renderHeader()}
                <Form.Field>
                    <Label content={fieldLabels.tags}/>
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
                        placeholder={placeholders.tags}
                    />
                </Form.Field>
            </Grid.Column>
}
 export default TagMultiselect
import { 
    TextArea,
    Grid,
    Header,
    Label,
    Form
} from "semantic-ui-react";
import { fieldLabels, placeholders, sectionHeaders } from "../common/fieldLabel";

function PostText (props){

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        props.updatePostText(name,value);
    };

    return <Grid.Column>
                <Header as='h4' content={sectionHeaders.postDescription} textAlign='left' />
                <Form.Field>
                    <Label content={fieldLabels.postTitle}/>
                    <TextArea 
                        name='title' 
                        placeholder={placeholders.postTitle} 
                        onChange={handleInputChange} 
                        value={props.post.title || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label content={fieldLabels.postDescription}/>
                    <TextArea 
                        name='description' 
                        placeholder={placeholders.postDescription} 
                        style={{ minHeight: 200 }} 
                        onChange={handleInputChange} 
                        value={props.post.description || ''}
                    />
                </Form.Field>
            </Grid.Column>;
}
 export default PostText
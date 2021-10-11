import { 
    TextArea,
    Grid,
    Header,
    Label,
    Form
} from "semantic-ui-react";

function PostText (props){

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        props.updatePostText(name,value);
    };

    return <Grid.Column>
                <Header as='h4' content='Descriçao do Post:' textAlign='left' />
                <Form.Field>
                    <Label>Titulo:</Label>
                    <TextArea 
                        name='title' 
                        placeholder='Titulo do Post...' 
                        onChange={handleInputChange} 
                        value={props.post.title || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>Texto:</Label>
                    <TextArea 
                        name='description' 
                        placeholder='Texto do Post...' 
                        style={{ minHeight: 200 }} 
                        onChange={handleInputChange} 
                        value={props.post.description || ''}
                    />
                </Form.Field>
            </Grid.Column>;
}
 export default PostText
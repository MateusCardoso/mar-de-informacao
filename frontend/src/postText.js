import { 
    TextArea,
    Grid,
    Header,
    Label,
    Form
} from "semantic-ui-react";

class PostText extends TextArea{
    constructor(props){
        super(props);
    }

    async save(postId) {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: postId })
        };
        const response = await fetch(process.env.REACT_APP_API_URL+'/posts/'+postId, requestOptions)
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return(
            <Grid.Column>
                <Header as='h4' content='Descriçao do Post:' textAlign='left' />
                <Form.Field>
                    <Label>Texto:</Label>
                    <TextArea placeholder='Texto do Post...' style={{ minHeight: 200 }}/>
                </Form.Field>
            </Grid.Column>
        )
    }

}
 export default PostText
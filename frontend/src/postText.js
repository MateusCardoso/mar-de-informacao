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
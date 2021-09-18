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

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(evt){
        const value = evt.target.value;
        const name = evt.target.name;

        this.props.updatePostText(name,value);
    }

    render() {
        return(
            <Grid.Column>
                <Header as='h4' content='Descriçao do Post:' textAlign='left' />
                <Form.Field>
                    <Label>Titulo:</Label>
                    <TextArea name='title' placeholder='Titulo do Post...' onChange={this.handleInputChange} value={this.props.title}/>
                </Form.Field>
                <Form.Field>
                    <Label>Texto:</Label>
                    <TextArea name='description' placeholder='Texto do Post...' style={{ minHeight: 200 }} onChange={this.handleInputChange} value={this.props.description}/>
                </Form.Field>
            </Grid.Column>
        )
    }
}
 export default PostText
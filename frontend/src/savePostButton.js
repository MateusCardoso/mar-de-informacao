import { 
    Grid,
    Button
} from "semantic-ui-react";

class SavePostButton extends Button{
    constructor(props){
        super(props);
        this.updatePost=this.updatePost.bind(this);
    }

    updatePost() {
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.props.postId, description: this.props.postId })
        };
        fetch(process.env.REACT_APP_API_URL+'/posts/'+this.props.postId, requestOptions)
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        return(
            <Grid.Row>
              <Button label='Salvar' onClick={this.updatePost}></Button>
            </Grid.Row>
        )
    }

}
 export default SavePostButton
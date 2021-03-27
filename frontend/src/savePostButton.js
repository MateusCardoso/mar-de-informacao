import { 
    Grid,
    Button
} from "semantic-ui-react";

class SavePostButton extends Button{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <Grid.Row>
              <Button label='Salvar' onClick={this.props.savePost}></Button>
            </Grid.Row>
        )
    }

}
 export default SavePostButton
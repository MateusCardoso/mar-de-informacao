import { 
    Grid,
    Button
} from "semantic-ui-react";

function FindPostsButton (props){
    
    return <Grid.Row>
                <Button onClick={props.getPosts}>Procurar</Button>
            </Grid.Row>;

}
 export default FindPostsButton
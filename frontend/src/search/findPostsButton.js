import { 
    Grid,
    Button
} from "semantic-ui-react";
import { buttons } from "../common/fieldLabel";

function FindPostsButton (props){
    
    return <Grid.Row>
                <Button onClick={props.getPosts}>{buttons.find}</Button>
            </Grid.Row>;

}
 export default FindPostsButton
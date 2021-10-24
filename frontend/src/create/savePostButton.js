import { Button } from "semantic-ui-react";
import { buttons } from "../common/fieldLabel";
import UpdatePost from "./updatePost";

function SavePostButton (props){
   
    return  <Button 
                secondary
                type="button"
                onClick={() => UpdatePost(props)}>
                    {buttons.save}
            </Button>
    
}
 export default SavePostButton
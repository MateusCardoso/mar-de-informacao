import { Button } from "semantic-ui-react";
import UpdatePost from "./updatePost";

function SavePostButton (props){
   
    return  <Button 
                secondary
                onClick={() => UpdatePost(props)}>
                    Salvar
            </Button>
    
}
 export default SavePostButton
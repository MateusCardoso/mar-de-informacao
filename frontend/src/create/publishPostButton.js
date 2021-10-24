import { Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';
import UpdatePost from "./updatePost";

import {buttons} from "../common/fieldLabel";

function PublishPostButton (props) {

    const history = useHistory();

    const publishPost = async (event) => {
        event.preventDefault();
        await UpdatePost(props);

        const postId = props.post.id;
        const requestOptions = {
            method: 'PATCH'
        }
        try{
            fetch(process.env.REACT_APP_API_URL+'/posts/publish/'+postId, requestOptions);
        }
        catch(error){
            console.error('Error:', error);
        };
        history.push("/Display/" + postId);
    }

    return  <Button
                primary
                type="button"
                onClick={publishPost}>
                    {buttons.publish}
            </Button>
}

export default PublishPostButton;
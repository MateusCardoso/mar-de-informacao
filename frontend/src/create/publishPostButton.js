import { Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';
import UpdatePost from "./updatePost";

function PublishPostButton (props) {

    const history = useHistory();

    const publishPost = async () => {
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
                onClick={publishPost}>
                    Publicar
            </Button>
}

export default PublishPostButton;
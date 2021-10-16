import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from "semantic-ui-react";


function EditPostButton (props) {
    const history = useHistory();

    const redirectToEdit = () => {
        history.push("/Edit/" + props.postId);
        
    };

    return <Button
        primary
        onClick={() => {redirectToEdit()}}
        content='Editar'
    />
}

export default EditPostButton;
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import { buttons } from '../common/fieldLabel';


function EditPostButton (props) {
    const history = useHistory();

    const redirectToEdit = () => {
        history.push("/Edit/" + props.postId);
        
    };

    return <Button
        primary
        onClick={() => {redirectToEdit()}}
        content={buttons.edit}
    />
}

export default EditPostButton;
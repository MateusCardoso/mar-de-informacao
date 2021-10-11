import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function NewPost(){

  const createPostRecord = useCallback ( async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        beachReport: {
          windStatus: {}
        },
      })
    };
    const response = await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
    const data = await response.json();
    return(data.id);
  });
  
  const history = useHistory();
  const redirectToEdit = useCallback( async (id) => {
    const postId = await id;
    if(postId !== null){
      history.push("/Edit/" + postId);
    }
  });

  useEffect(()=>{
    redirectToEdit(createPostRecord());
  }, []);

  return (null);
}

export default NewPost
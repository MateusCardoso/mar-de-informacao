import { Grid } from "semantic-ui-react";
import { fieldLabels, sectionHeaders } from '../common/fieldLabel';
import UploadImageCard from './uploadImageCard';


function GalleryImageUpload(props) {

    return  <Grid stackable columns={3}>
        { props.images.map((image, index) => {
           return <Grid.Column key={index}>
               <UploadImageCard 
                   updateImage={props.updateImage}
                   postId={props.postId} 
                   image={image} 
                   category={props.category}
                   useIcon={true}
                   size={'small'}
               /> 
           </Grid.Column>
        })}
        <Grid.Column key={props.images.lenght}>
               <UploadImageCard 
                   updateImage={props.updateImage}
                   postId={props.postId}  
                   category={props.category}
                   useIcon={true}
                   size={'small'}
               /> 
           </Grid.Column>

    </Grid>
            
}

export default GalleryImageUpload;
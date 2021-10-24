import { Grid, Header } from "semantic-ui-react";
import { fieldLabels, sectionHeaders } from '../common/fieldLabel';
import UploadImageCard from './uploadImageCard';

function CoverImageUpload (props) {
return <Grid.Column>
            <Header as={'h4'} content={sectionHeaders.coverImage} textAlign='left' />
            <UploadImageCard 
                updateImage={props.updateImage}
                postId={props.postId} 
                image={props.image} 
                category={'M'}
                size={'big'} 
                imageLabel={fieldLabels.mainImage}
            />
        </Grid.Column>

}

export default CoverImageUpload;
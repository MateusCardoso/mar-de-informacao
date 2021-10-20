import { 
    Label,
    Form,
    Input,
    Image,
    Grid
} from "semantic-ui-react";
import { fieldLabels } from "../common/fieldLabel";


function UploadImageButton (props){

    return <Grid.Column>
                <Form.Field>
                    <Label content={fieldLabels.mainImage}/>
                    <Input
                        fluid
                        onChange={(evt) => {props.setMainImage({
                            ...props.mainImage,
                            uploadRequired: true,
                            file: evt.target.files[0],
                            localUrl: URL.createObjectURL(evt.target.files[0])
                        })}}
                        type='file'
                    />
                    <Image size='big' src={props.mainImage.localUrl}/>
                    
                </Form.Field>
            </Grid.Column>

}

export default UploadImageButton;
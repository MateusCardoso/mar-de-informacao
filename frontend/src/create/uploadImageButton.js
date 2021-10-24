import { useRef } from "react";
import { 
    Label,
    Form,
    Input,
    Image,
    Grid,
    Button,
    Ref
} from "semantic-ui-react";
import { buttons } from "../common/fieldLabel";
import ImageUpload from "./imageUpload";


function UploadImageButton (props){

    const onImageChange = async (evt) => {
        if(evt.target.files.length !== 0){
            const currentImage = {
                ...props.image,
                name: evt.target.files[0].name,
                category: props.category,
                uploadRequired: true,
                content: evt.target.files[0],
                localURL: URL.createObjectURL(evt.target.files[0])
            }
            await ImageUpload({
                postId: props.postId,
                image: currentImage,
                updateImage: props.updateImage
            });
        }
    }

    var inputRef = useRef(null);

    return <Grid.Column>
                <Label content={props.imageLabel}/>
                {
                    props.image !== undefined ? 
                    <Image size='big' src={props.image.localURL}/>
                    : null
                }    
                <input
                ref={inputRef}
                    onChange={onImageChange}
                    type='file'
                    style={{display: 'none'}}
                    />
                
                
                <Button 
                    secondary
                    size='mini'
                    onClick={() => inputRef.current.click()} 
                    content={buttons.uploadImage}
                />
            </Grid.Column>

}

export default UploadImageButton;
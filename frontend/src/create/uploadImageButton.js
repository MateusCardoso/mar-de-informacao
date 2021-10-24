import { useRef } from "react";
import {
    Header, 
    Image,
    Grid,
    Button,
    Card
} from "semantic-ui-react";
import { buttons, sectionHeaders } from "../common/fieldLabel";
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

    const removeImage = async () => {
        const currentImage = {
            ...props.image,
            deleteRequired: true
        }
        await ImageUpload({
            postId: props.postId,
            image: currentImage,
            updateImage: props.updateImage
        });
    }

    var inputRef = useRef(null);

    return <Grid.Column>
                <Header as='h4' content={sectionHeaders.coverImage} textAlign='left' />
                <Card fluid>
                    { props.image !== undefined ?
                        <Image size='big' src={props.image.localURL}/>
                        : null
                    }    
                    <Card.Content textAlign={'right'}>
                        <Button 
                            secondary
                            size='tiny'
                            onClick={() => inputRef.current.click()} 
                            content={buttons.uploadImage}
                            />
                        { props.image !== undefined ?
                            <Button 
                                negative 
                                size={'tiny'}
                                onClick={removeImage} 
                                content={buttons.removeImage}/>
                            : null
                        }
                    </Card.Content>
                </Card> 
                
                <input
                ref={inputRef}
                    onChange={onImageChange}
                    type='file'
                    style={{display: 'none'}}
                />
        
            </Grid.Column>

}

export default UploadImageButton;
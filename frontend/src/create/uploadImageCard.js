import { useRef } from "react";
import {
    Image,
    Button,
    Card
} from "semantic-ui-react";
import { buttons } from "../common/fieldLabel";
import ImageUpload from "./imageUpload";


function UploadImageCard (props){

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

    return  <Card fluid>
                { props.image !== undefined ?
                    <Image size={props.size} src={props.image.localURL}/>
                    : null
                }    
                <Card.Content textAlign={props.useIcon ? 'center' : 'right'}>
                    <Button 
                        secondary
                        size='tiny'
                        icon={props.image !== undefined && props.useIcon ? 'upload' : null }
                        onClick={() => inputRef.current.click()} 
                        content={props.image !== undefined && props.useIcon ? null : buttons.uploadImage}
                    />
                    { props.image !== undefined ?
                        <Button 
                            negative 
                            size={'tiny'}
                            icon={props.useIcon ? 'delete' : null }
                            onClick={removeImage} 
                            content={props.useIcon ? null : buttons.removeImage}/>
                        : null
                    }
                </Card.Content>
                <input
                    ref={inputRef}
                    onChange={onImageChange}
                    type='file'
                    style={{display: 'none'}}
                />
            </Card> 

}

export default UploadImageCard;
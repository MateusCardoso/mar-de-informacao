

async function ImageUpload (props) {

    const postId = await props.postId;
    const image = props.image;
    
    const buildRequestOptions = (method,body) => {
        return {
            method: method,
            body: body
        };
    }

    const formData = new FormData();
    formData.append('fileName', image.file.name);
    formData.append('multipartImage', image.file);

    if(image.id === null){
        const response = await fetch(process.env.REACT_APP_API_URL+'/images/postId='+postId+'?category='+props.category, buildRequestOptions('POST', formData))
        const data = await response.json();
        props.setImage({
            ...props.image,
            id: data
        });        
    } else if(image.uploadRequired){
        await fetch(process.env.REACT_APP_API_URL+'/images/'+image.id, buildRequestOptions('PATCH', formData))
        props.setImage({
            ...props.image,
            uploadRequired: false
        });        
    }

}

export default ImageUpload;
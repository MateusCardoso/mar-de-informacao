

async function ImageUpload (props) {

    const postId = await props.postId;
    let image = props.image;
    
    const buildRequestOptions = (method,body) => {
        return {
            method: method,
            body: body
        };
    }

    const formData = new FormData();
    formData.append('fileName', image.content.name);
    formData.append('multipartImage', image.content);

    if(image.id === undefined){
        const response = await fetch(process.env.REACT_APP_API_URL+'/images/postId='+postId+'?category='+image.category, buildRequestOptions('POST', formData))
        const data = await response.json();
        image = {
            ...image,
            id: data,
            uploadRequired: false
        };        
    } else if(image.uploadRequired){
        await fetch(process.env.REACT_APP_API_URL+'/images/'+image.id, buildRequestOptions('PATCH', formData))
        image = {
            ...image,
            uploadRequired: false
        };        
    }
    props.updateImage(image);

}

export default ImageUpload;
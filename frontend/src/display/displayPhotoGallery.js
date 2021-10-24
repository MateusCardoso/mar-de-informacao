import {
    Segment,
    Image,
    Grid
  } from 'semantic-ui-react'

function DisplayPhotoGallery(props){

    return <Grid stackable columns={3}>
                { props.images.map((image, index) => {
                    return <Grid.Column key={index}>
                        <Image size='small' src={image.localURL} centered href={image.localURL}/>
                    </Grid.Column>
                })}
            </Grid>
}

export default DisplayPhotoGallery;
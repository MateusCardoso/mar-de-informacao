import {
    Segment,
    Image,
    Grid
  } from 'semantic-ui-react'

function DisplayCoverImage(props) {
    return <Grid.Column>
            <Segment basic >
                <Image 
                    centered
                    size='big' 
                    src={props.image !== undefined ? props.image.localURL : null}
                    href={props.image.localURL}
            />
            </Segment>
        </Grid.Column>
}

export default DisplayCoverImage;
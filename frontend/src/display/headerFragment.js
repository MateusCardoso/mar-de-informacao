import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'
import { fieldLabels } from '../common/fieldLabel';

import DisplayTags from './displayTags';

function HeaderFragment (props) {

    var post = props.post;
    var tags = props.tags;
    return <Grid.Column>
                <Segment basic>
                    <Header as='h1'>{post.title}</Header>
                    {post.description}
                    { tags.length ?
                        <Segment basic>{fieldLabels.tags}: 
                            <DisplayTags tags={tags}></DisplayTags>
                        </Segment>
                        : null
                    }
                </Segment>
            </Grid.Column>
};

export default HeaderFragment;
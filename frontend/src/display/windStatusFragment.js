import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'
import { fieldLabels, sectionHeaders, units } from '../common/fieldLabel';

function WindStatusFragment (props) {
    var windStatus = props.windStatus;

    return windStatus.windDirection !== null || windStatus.windVelocity !== null ?
            <Grid.Column>
                <Segment basic >
                    <Header as='h3'>{sectionHeaders.windSection}</Header>
                    <Segment>
                        { windStatus.windDirection ?
                            <Segment basic>
                                {fieldLabels.windDirection} {windStatus.windDirection}
                            </Segment>
                            : null 
                        }
                        { windStatus.windVelocity ?
                            <Segment basic>
                                {fieldLabels.windVelocity} {windStatus.windVelocity} {units.velocity}
                            </Segment>
                            : null
                        }
                    </Segment>
                </Segment>
            </Grid.Column>
            : null
};

export default WindStatusFragment;
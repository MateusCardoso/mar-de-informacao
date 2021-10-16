import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'
import fieldLabels from '../common/fieldLabel';

function PrecipitationFragment (props) {
    let beachReport = props.beachReport;
    return beachReport.rainVolume !== null ?
            <Grid.Column>
                <Segment basic>
                    <Header as='h3'>Precipitaçao</Header>
                    <Segment>
                        <Segment basic>
                            {fieldLabels.rainVolume}: {beachReport.rainVolume} mm
                        </Segment>
                    </Segment>
                </Segment>
            </Grid.Column>
            : null 
}

export default PrecipitationFragment;
import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'
import { fieldLabels, sectionHeaders, units } from '../common/fieldLabel';

function BeachReportFragment (props) {
    var beachReport = props.beachReport;

    return beachReport.waterQuality !== null  || beachReport.temperature !== null ?
            <Grid.Column >
                <Segment basic>
                    <Header as='h3'>{sectionHeaders.beachReportSection}</Header>
                    <Segment>
                        { beachReport.waterQuality ?
                            <Segment basic>
                                {fieldLabels.waterQuality} {beachReport.waterQuality}
                            </Segment>
                            : null
                        }
                        { beachReport.temperature ?
                            <Segment basic>
                                {fieldLabels.temperature} {beachReport.temperature} {units.temperature}
                            </Segment>    
                            : null 
                        }
                    </Segment>
                </Segment>
            </Grid.Column>
            : null
};

export default BeachReportFragment;
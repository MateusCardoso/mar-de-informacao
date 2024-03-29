import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'
import { fieldLabels, sectionHeaders, units } from '../common/fieldLabel';

function FishingFragment (props) {
    let beachReport = props.beachReport;
    return beachReport.fishCatched !== null || beachReport.fishQuantity !== null ?
                <Grid.Column>
                <Segment basic>
                    <Header as='h3'>{sectionHeaders.fishing}</Header>
                    <Segment>
                        { beachReport.fishCatched !== null ?
                            <Segment basic>
                                {fieldLabels.fishCatched}: {beachReport.fishCatched}
                            </Segment>
                            : null
                        }
                        { beachReport.fishQuantity !== null ?
                            <Segment basic>
                                {fieldLabels.fishQuantity}: {beachReport.fishQuantity} {units.quantity}
                            </Segment>
                            : null
                        }
                    </Segment>
                </Segment>
            </Grid.Column>
            : null 
}

export default FishingFragment;
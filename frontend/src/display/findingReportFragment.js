import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'
import { fieldLabels, sectionHeaders, units } from '../common/fieldLabel';

function FindingReportFragment (props) {
    var findingReport = props.findingReport;

    return  findingReport.animalName !== null || findingReport.animalSpecies !== null || 
            findingReport.garbageOrigin !== null || findingReport.garbageQuantity !== null ? 
            <Segment>
                <Grid columns={2} stackable>
                    {   findingReport.animalName !== null || findingReport.animalSpecies !== null ?
                        <Grid.Column>
                            <Header as='h3'>{sectionHeaders.animalFinding}</Header>
                            <Segment>
                                {   findingReport.animalName !== null ?
                                    <Segment basic>
                                        {fieldLabels.animalName}: {findingReport.animalName}
                                    </Segment>
                                    : null
                                }
                                {   findingReport.animalSpecies !== null?
                                    <Segment basic>
                                        {fieldLabels.animalSpecies}: {findingReport.animalSpecies}
                                    </Segment>
                                    : null
                                }
                                <Segment basic>
                                    {sectionHeaders.photos}
                                </Segment>
                            </Segment>
                        </Grid.Column>
                        : null
                    }
                    {   findingReport.garbageOrigin !== null || findingReport.garbageQuantity !== null ?
                        <Grid.Column>
                            <Header as='h3'>{sectionHeaders.garbageFinding}</Header>
                                <Segment>
                                    {   findingReport.garbageOrigin !== null ?
                                        <Segment basic>
                                            {fieldLabels.garbageOrigin}: {findingReport.garbageOrigin}
                                        </Segment>
                                        : null
                                    }
                                    {   findingReport.garbageQuantity !== null ?
                                        <Segment basic>
                                            {fieldLabels.garbageQuantity}: {findingReport.garbageQuantity} {units.quantity}
                                        </Segment>
                                        : null
                                    }
                                    <Segment basic>
                                        {sectionHeaders.photos}
                                    </Segment>
                                </Segment>
                        </Grid.Column>
                        : null
                    }
                </Grid>
            </Segment>
            : null
}

export default FindingReportFragment;
import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'

function BeachReportFragment (props) {
    var beachReport = props.beachReport;

    return beachReport.waterQuality !== null  || beachReport.temperature !== null ?
            <Grid.Column >
                <Segment basic>
                    <Header as='h3'>Situaçao do Mar</Header>
                    <Segment>
                        { beachReport.waterQuality ?
                            <Segment basic>
                                Transparencia da Agua: {beachReport.waterQuality}
                            </Segment>
                            : null
                        }
                        <Segment basic>
                            Intensidade da Mare:
                        </Segment>
                        { beachReport.temperature ?
                            <Segment basic>
                                Temperatura: {beachReport.temperature} ºC
                            </Segment>    
                            : null 
                        }
                    </Segment>
                </Segment>
            </Grid.Column>
            : null
};

export default BeachReportFragment;
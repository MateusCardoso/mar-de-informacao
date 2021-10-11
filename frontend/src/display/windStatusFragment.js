import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'

function WindStatusFragment (props) {
    var windStatus = props.windStatus;

    return windStatus.windDirection !== null && windStatus.windVelocity !== null ?
            <Grid.Column>
                <Segment basic >
                    <Header as='h3'>Situaçao do Vento</Header>
                    <Segment>
                        { windStatus.windDirection ?
                            <Segment basic>
                                Direçao do Vento: {windStatus.windDirection}
                            </Segment>
                            : null 
                        }
                        { windStatus.windVelocity ?
                            <Segment basic>
                                Velocidade do Vento: {windStatus.windVelocity} Km/h
                            </Segment>
                            : null
                        }
                    </Segment>
                </Segment>
            </Grid.Column>
            : null
};

export default WindStatusFragment;
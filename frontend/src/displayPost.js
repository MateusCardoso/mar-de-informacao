import React from 'react'
import {
  Header,
  Segment,
  Image,
  Grid
} from 'semantic-ui-react'

class DisplayPost extends React.Component{

    render(){
        return(
            <div>
                <Segment padded='very' inverted color='grey'>
                    <Header as='h1'>Posts Museu do Mar</Header>
                </Segment>
                <Segment>
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Segment basic >
                                <Image size='big' src={'/images/placeholder.png'}></Image>
                                
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic>Bom dia 13 de abril praia do quintao rei do peixe rs temperatura
                                20 graus sem vento mar lavando meia praia corrente de sul forte valeu galera tamo junto
                                <Segment basic>Tags: </Segment>
                            </Segment>
                            <Segment basic>
                                <Header as='h3'>Situaçao do Mar</Header>
                                <Segment>
                                    <Segment basic>
                                        Transparencia da Agua:
                                    </Segment>
                                
                                    <Segment basic>
                                        Sentido da Mare:
                                    </Segment>
                                    <Segment basic>
                                        Intensidade da Mare:
                                    </Segment>
                                    <Segment basic>
                                        Temperatura:
                                    </Segment>    
                                </Segment>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic>
                                <Header as='h3'>Situaçao do Vento</Header>
                                <Segment>
                                    <Segment basic>
                                        Direçao do Vento:
                                    </Segment>
                                    <Segment basic>
                                        Velocidade do Vento:
                                    </Segment>
                                </Segment>
                            </Segment>
                            <Segment basic>
                                <Header as='h3'>Precipitaçao</Header>
                                <Segment>
                                    <Segment basic>
                                        Quantidade de chuva (mm):
                                    </Segment>
                                    <Segment basic>
                                        Velocidade do Vento:
                                    </Segment>
                                </Segment>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment basic>
                                <Header as='h3'>Pescaria</Header>
                                <Segment>
                                    <Segment basic>
                                        Especie mais capturada:
                                    </Segment>
                                    <Segment basic>
                                        Quantidade (Kg):
                                    </Segment>
                                </Segment>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Header as='h3'>Animais Encontrados</Header>
                            <Segment>
                                <Segment basic>
                                    Especies:
                                </Segment>
                                <Segment basic>
                                    Fotos:
                                </Segment>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h3'>Lixo</Header>
                                <Segment>
                                    <Segment basic>
                                        Quantidade de Lixo (Kg):
                                    </Segment>
                                    <Segment basic>
                                        Origem:
                                    </Segment>
                                    <Segment basic>
                                        Fotos:
                                    </Segment>
                                </Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as='h3'>Links:</Header>
                </Segment>
            </div>
        );
    }
}

export default DisplayPost
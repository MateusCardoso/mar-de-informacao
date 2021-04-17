import React from 'react'
import {
  Form,
  Grid,
  Header, 
  Card,
  Icon
} from 'semantic-ui-react'

export default function Home(){
    return(
        <div>
            <Header size='huge' style={{ minHeight: 50}} > Pagina Inicial</Header>
            <Grid columns={2} stackable >
                <Grid.Column>
                    <Create/>
                </Grid.Column>
                <Grid.Column>
                    <Search/>
                </Grid.Column>
            </Grid>
      </div>
    );
}

function Create(){
    return(
        <Card href='/Create' fluid centered>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column>
                        <Icon color='black' name='newspaper outline' circular size='huge' />
                    </Grid.Column>
                    <Grid.Column>
                        <Card.Header as='h2' style={{ padding: '1.5em 1em'}}>Criar Novo Post</Card.Header>
                    </Grid.Column>
                </Grid>
            </Card.Content>            
        </Card>
    );
}

function Search(){
    return(
        <Card href='/Create' fluid>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column>
                        <Icon color='black' name='zoom' circular size='huge' style={{ padding: '1em 1em' }} />
                    </Grid.Column>
                    <Grid.Column>
                        <Card.Header as='h2' style={{ padding: '1.5em 1em'}}>Buscar Posts</Card.Header>
                    </Grid.Column>
                </Grid>
            </Card.Content>            
        </Card>
    );
}
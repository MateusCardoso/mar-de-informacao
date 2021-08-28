import React from 'react'
import {
  Grid,
  Header, 
  Card,
  Icon
} from 'semantic-ui-react'

export default function Home(){
    return(
        <div>
            <Header size='huge' style={{ minHeight: 50}} > Pagina Inicial</Header>
            <Grid columns={3} stackable >
                <Grid.Column>
                    <Create/>
                </Grid.Column>
                <Grid.Column>
                    <Search/>
                </Grid.Column>
                <Grid.Column>
                    <Display/>
                </Grid.Column>
            </Grid>
      </div>
    );
}

function Create(){
    return(
        <Card href='/Create' centered>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column verticalAlign='middle'>
                        <Icon color='black' name='newspaper outline' circular size='huge' />
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Card.Header as='h2' >Novo Post</Card.Header>
                    </Grid.Column>
                </Grid>
            </Card.Content>            
        </Card>
    );
}

function Search(){
    return(
        <Card href='/Search'>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column verticalAlign='middle'>
                        <Icon color='black' name='zoom' circular size='huge' />
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Card.Header as='h2' >Buscar Posts</Card.Header>
                    </Grid.Column>
                </Grid>
            </Card.Content>            
        </Card>
    );
}

function Display(){
    return(
        <Card href='/Display'>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column verticalAlign='middle'>
                        <Icon color='black' name='folder open' circular size='huge' />
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Card.Header as='h2'>Abrir Post</Card.Header>
                    </Grid.Column>
                </Grid>
            </Card.Content>            
        </Card>
    );
}
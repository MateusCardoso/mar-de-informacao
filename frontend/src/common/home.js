import React from 'react'
import {
  Grid,
  Header, 
  Card,
  Icon,
  Segment
} from 'semantic-ui-react'

import { apps } from './fieldLabel';

export default function Home(){
    return(
        <div>
            <Segment padded='very' inverted color='grey'>
                <Header size='huge'>{apps.homeHeader}</Header>
            </Segment>
            <Grid columns={3} stackable >
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
                    <Grid.Column verticalAlign='middle'>
                        <Icon color='black' name='newspaper outline' circular size='huge' />
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Card.Header as='h2' >{apps.createCard}</Card.Header>
                    </Grid.Column>
                </Grid>
            </Card.Content>            
        </Card>
    );
}

function Search(){
    return(
        <Card href='/Search' fluid centered>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column verticalAlign='middle'>
                        <Icon color='black' name='zoom' circular size='huge' />
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Card.Header as='h2' >{apps.searchCard}</Card.Header>
                    </Grid.Column>
                </Grid>
            </Card.Content>            
        </Card>
    );
}
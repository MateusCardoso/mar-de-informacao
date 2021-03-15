import React from 'react'
import {
  Button,
  Container,
  Grid,
  GridColumn,
  Header,
  Icon,
  Table,
  TableCell,
} from 'semantic-ui-react'

import {
  PostText,
  WaterQualityInput,
  TemperatureInput,
  FishingDropdown,
  WindDirectionInput,
  WindVelocityInput,
  TagDropdown,
  LinkNameInput,
  LinkURLInput
} from "./createComponents"

const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}

const NewPost = () => (
  <div>
    <Header as='h1' content='Entrar novo Post' style={style.h1} textAlign='left' />

    <Grid columns={2} stackable>
      <Grid.Column>
        <Header as='h4' content='Descriçao do Post:' textAlign='left' style={style.h4} />
        <PostText></PostText>
      </Grid.Column>
      <Grid.Column>
        <Header as='h4' content='Reporte do Mar:' textAlign='left' style={style.h4} />
        <WaterQualityInput></WaterQualityInput>
        <TemperatureInput></TemperatureInput>
        <FishingDropdown></FishingDropdown>
      </Grid.Column>
      <Grid.Column>
        <Header as='h4' content='Vento:' textAlign='left' style={style.h4} />
        <WindDirectionInput></WindDirectionInput>
        <WindVelocityInput></WindVelocityInput>
      </Grid.Column>
      <GridColumn>
        <Header as='h4' content='Categoria do Post:' textAlign='left' style={style.h4} />
        <TagDropdown></TagDropdown>
      </GridColumn>
      <GridColumn>
        <Header as='h4' content='Links:' style={style.h4} textAlign='left' />
        <Container>
          <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome do Link</Table.HeaderCell>
              <Table.HeaderCell>URL</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          <Table.Row>
            <TableCell><LinkNameInput></LinkNameInput></TableCell>
            <TableCell><LinkURLInput></LinkURLInput></TableCell>
          </Table.Row>
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <Button
                  floated='right'
                  icon
                  labelPosition='left'
                  primary
                  size='small'
                >
                  <Icon name='world' /> Adicionar Link
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </Container>
      </GridColumn>
    </Grid>
  </div>
)

export default NewPost
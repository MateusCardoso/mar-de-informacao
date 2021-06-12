import React from 'react'
import { 
    Dropdown, 
    Form, 
    Label,
    Input,
    Grid,
    Header,
    Container,
    Table, 
    Button, 
    Icon 
} from 'semantic-ui-react'

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

const tags = [
    {
      key: '1',
      text: 'Pescaria',
      value: '1',
    },
    {
      key: '2',
      text: 'Lixo no Mar',
      value: '2',
    },
    {
        key: '3',
        text: 'Animais',
        value: '3',
    }
]
const TagDropdown = () => (
    <Grid.Column>
        <Header as='h4' content='Categoria do Post:' textAlign='left' style={style.h4} />
            <Form.Field>
                <Label>Tags de Busca</Label>
                <Dropdown
                    allowAdditions
                    clearable
                    fluid
                    multiple
                    search
                    selection
                    options={tags}
                    placeholder='Tags...'
                />
            </Form.Field>
    </Grid.Column>
    
  )

const LinkNameInput = () => (
    <Form.Field>
        <Input fluid
            placeholder='Nome...'
        />
    </Form.Field>
)

const LinkURLInput = () => (
    <Form.Field>
        <Input fluid
            placeholder='URL...'
        />
    </Form.Field>
)

const LinkTableSection = () => (
    <Grid.Column>
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
                    <Table.Cell><LinkNameInput></LinkNameInput></Table.Cell>
                    <Table.Cell><LinkURLInput></LinkURLInput></Table.Cell>
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
    </Grid.Column>
)

export {
    LinkTableSection,
    TagDropdown
} 
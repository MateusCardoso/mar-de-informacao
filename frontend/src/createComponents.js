import React from 'react'
import { 
    Dropdown, 
    Form, 
    Label,
    TextArea,
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

const stars = [
  {
    key: '1',
    text: '1',
    value: '1',
  },
  {
    key: '2',
    text: '2',
    value: '2',
  },
  {
    key: '3',
    text: '3',
    value: '3',
  },
  {
    key: '4',
    text: '4',
    value: '4',
  },
  {
    key: '5',
    text: '5',
    value: '5',
  },
]

const FishingDropdown = () => (
    <Form>
        <Form.Field>
            <Label>Nota para Pescaria</Label>
            <Dropdown
                placeholder='Nota...'
                fluid
                selection
                options={stars}
            />
        </Form.Field>
    </Form>
)

const PostText = () => (
    <Grid.Column>
        <Header as='h4' content='Descriçao do Post:' textAlign='left' />
        <Form>
            <Label>Texto:</Label>
            <TextArea placeholder='Texto do Post...' style={{ minHeight: 200 }}/>
        </Form>
    </Grid.Column>
)

const TemperatureInput = () => (
    <Form>
        <Label>Temperatura</Label>
        <Input fluid
        label={{ basic: true, content: '°C' }}
        labelPosition='right'
        placeholder='Graus...'
    />
    </Form>
)

const WaterQualityInput = () => (
    <Form>
        <Form.Field>
            <Label>Qualidade da Agua</Label>
            <Input fluid
                placeholder='Qualidade...'
            />
        </Form.Field>
    </Form>
)

const WindDirectionInput = () => (
    <Form>
        <Form.Field>
            <Label>Direçao do Vento</Label>
            <Input fluid
                placeholder='Direçao...'
            />
        </Form.Field>
    </Form>
)

const WindVelocityInput = () => (
    <Form>
        <Label>Velocidade do Vento</Label>
        <Input fluid
        label={{ basic: true, content: 'Km/h' }}
        labelPosition='right'
        placeholder='Velocidade...'
    />
    </Form>
)

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
        <Form>
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
        </Form>
    </Grid.Column>
    
  )

const LinkNameInput = () => (
    <Form>
        <Form.Field>
            <Input fluid
                placeholder='Nome...'
            />
        </Form.Field>
    </Form>
)

const LinkURLInput = () => (
    <Form>
        <Form.Field>
            <Input fluid
                placeholder='URL...'
            />
        </Form.Field>
    </Form>
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

const BeachReportSection = () => (
    <Grid.Column>
        <Header as='h4' content='Reporte do Mar:' textAlign='left' />
        <WaterQualityInput></WaterQualityInput>
        <TemperatureInput></TemperatureInput>
        <FishingDropdown></FishingDropdown>
    </Grid.Column>
)

const WindStatusSection = () => (
    <Grid.Column>
        <Header as='h4' content='Vento:' textAlign='left' />
        <WindDirectionInput></WindDirectionInput>
        <WindVelocityInput></WindVelocityInput>
    </Grid.Column>
)

export {
    PostText,
    BeachReportSection,
    WindStatusSection,
    LinkTableSection,
    TagDropdown
} 
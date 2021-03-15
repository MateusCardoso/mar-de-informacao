import React from 'react'
import { 
    Dropdown, 
    Form, 
    Label,
    TextArea,
    Input 

} from 'semantic-ui-react'

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
  <Form>
    <Label>Texto:</Label>
    <TextArea placeholder='Texto do Post...' style={{ minHeight: 200 }}/>
  </Form>
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

export {
    PostText,
    TemperatureInput,
    FishingDropdown,
    WaterQualityInput,
    WindDirectionInput,
    WindVelocityInput,
    TagDropdown,
    LinkNameInput,
    LinkURLInput
} 
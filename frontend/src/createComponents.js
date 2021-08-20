import React from 'react'
import { 
    Dropdown, 
    Form, 
    Label,
    Grid,
    Header
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

export {
    TagDropdown    
} 
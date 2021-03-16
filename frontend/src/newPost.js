import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header
} from 'semantic-ui-react'

import {
  PostText,
  BeachReportSection,
  WindStatusSection,
  TagDropdown,
  LinkTableSection
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
    <Form>
      <Grid columns={2} stackable>
        <PostText></PostText>
        <BeachReportSection></BeachReportSection>
        <WindStatusSection></WindStatusSection>
        <TagDropdown></TagDropdown>
        <LinkTableSection></LinkTableSection>
        
        <Grid.Row>
          <Form.Field control={Button}>Salvar</Form.Field>
        </Grid.Row>
      </Grid>
    </Form>
  </div>
)

export default NewPost
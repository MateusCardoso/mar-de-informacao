import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header
} from 'semantic-ui-react'

import {
  BeachReportSection,
  WindStatusSection,
  TagDropdown,
  LinkTableSection
} from "./createComponents"

import PostText from "./postText"

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

class NewPost extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      postId: null
    }
  }

  async componentDidMount() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: 'React POST Request Example' })
    };
    const response = await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
    const data = await response.json();
    this.setState({ postId: data.postId });
}

  render() {
    return (
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
  }

}

export default NewPost
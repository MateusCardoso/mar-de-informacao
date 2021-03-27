import React from 'react'
import {
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
import SavePostButton from "./savePostButton"

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
    };
    this.updatePost=this.updatePost.bind(this);
  }

  async componentDidMount() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    const response = await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
    const data = await response.json();
    this.setState({ postId: data.id });
  }

  updatePost() {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.state.postId, description: this.state.postId })
    };
    fetch(process.env.REACT_APP_API_URL+'/posts/'+this.state.postId, requestOptions)
    .catch((error) => {
        console.error('Error:', error);
    });
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
            <SavePostButton savePost={this.updatePost}></SavePostButton>
            
          </Grid>
        </Form>
      </div>
    )
  }

}

export default NewPost
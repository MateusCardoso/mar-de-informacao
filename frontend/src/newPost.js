import React from 'react'
import {
  Form,
  Grid,
  Header
} from 'semantic-ui-react'

import {
  WindStatusSection,
  TagDropdown,
  LinkTableSection
} from "./createComponents"

import PostText from "./postText"
import SavePostButton from "./savePostButton"
import BeachReport from "./beachReport"

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
      postId: null,
      description: null,
      beachReport: {
        reportId: null,
        waterQuality: null,
        temperature: null,
        fishingConditions: null
      }
    };
    this.updateDescription = this.updateDescription.bind(this);
    this.updateBeachReport = this.updateBeachReport.bind(this);
  }

  updateDescription(evt) {
    this.setState({description: evt.target.value})
  }

  updateBeachReport(beachReport) {
    this.setState({beachReport: beachReport})
  }

  async componentDidMount() {
    const postId = this.createPostRecord();
    const reportId = this.createBeachreport(postId);

    this.setState({ postId: postId, beachReport: {reportId: reportId} });
  }

  async createPostRecord(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    };
    const response = await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
    const data = await response.json();
    return (data.id);
  }

  async createBeachreport(postId){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({postId: postId})
    };

    const response = await fetch(process.env.REACT_APP_API_URL+'/reports', requestOptions);
    const data = await response.json();
    return (data.id);
  }

  render() {
    return (
      <div>
        <Header as='h1' content='Entrar novo Post' style={style.h1} textAlign='left' />
        <Form>
          <Grid columns={2} stackable>
            <PostText onChange={this.updateDescription} description={this.state.description}></PostText>
            <BeachReport updateBeachReport={this.updateBeachReport} beachReport={this.state.beachReport}></BeachReport>
            <WindStatusSection></WindStatusSection>
            <TagDropdown></TagDropdown>
            <LinkTableSection></LinkTableSection>
            <SavePostButton 
              postId={this.state.postId} 
              description={this.state.description}
              beachReport={this.state.beachReport}
            >
            </SavePostButton>
            
          </Grid>
        </Form>
      </div>
    )
  }

}

export default NewPost
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
      description: '',
      beachReport: {
        reportId: null,
        waterQuality: '',
        temperature: '',
        fishingConditions: ''
      }
    };
    this.updateDescription = this.updateDescription.bind(this);
    this.updateBeachReport = this.updateBeachReport.bind(this);
  }

  updateDescription(evt) {
    this.setState({description: evt.target.value})
  }

  updateBeachReport(name,value) {
    this.setState({beachReport: {
      [name]: value
    }})
  }

  async componentDidMount() {
    const entityIds = await this.createPostRecord();
    this.setState({ 
      postId: entityIds.postId,
      beachReport: {reportId: entityIds.reportId}
    });
  }

  async createPostRecord(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        report: {}
      })
    };
    const response = await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
    const data = await response.json();
    return ({postId: data.id, reportId: data.report.id});
  }

  render() {
    return (
      <div>
        <Header as='h1' content='Entrar novo Post' style={style.h1} textAlign='left' />
        <Form>
          <Grid columns={2} stackable>
            <PostText onChange={this.updateDescription} description={this.state.description}></PostText>
            <BeachReport updateBeachReport={this.updateBeachReport} postId={this.state.postId}></BeachReport>
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
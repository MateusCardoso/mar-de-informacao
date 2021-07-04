import React from 'react'
import {
  Form,
  Grid,
  Header
} from 'semantic-ui-react'

import {
  TagDropdown
} from './createComponents'

import PostText from './postText'
import SavePostButton from './savePostButton'
import BeachReport from './beachReport'
import WindStatus from './windStatus'
import LinkTable from './linkTable'

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
      },
      windStatus: {
        windId: null,
	      windDirection: '',
        windVelocity: ''
      },
      links: []
    };
    this.updateDescription = this.updateDescription.bind(this);
    this.updateBeachReport = this.updateBeachReport.bind(this);
    this.updateWindStatus = this.updateWindStatus.bind(this);
    this.updateLinks = this.updateLinks.bind(this);
  }

  updateDescription(evt) {
    this.setState({description: evt.target.value})
  }

  updateBeachReport(name,value) {
    var updatedReport = this.state.beachReport;
    updatedReport[name] = value;
    this.setState({beachReport: updatedReport})
  }

  updateWindStatus(name,value) {
    var updatedWindStatus = this.state.windStatus;
    updatedWindStatus[name] = value;
    this.setState({windStatus: updatedWindStatus})
  }

  updateLinks(links){
    this.setState({links: links});
  }

  async componentDidMount() {
    const entityIds = await this.createPostRecord();
    this.setState({ 
      postId: entityIds.postId,
      beachReport: {reportId: entityIds.reportId},
      windStatus:{windId: entityIds.windId}
    });
  }

  async createPostRecord(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        beachReport: {
          windStatus: {}
        },
      })
    };
    const response = await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
    const data = await response.json();
    return ({postId: data.id, reportId: data.beachReport.id, windId: data.beachReport.windStatus.id});
  }

  render() {
    return (
      <div>
        <Header as='h1' content='Entrar novo Post' style={style.h1} textAlign='left' />
        <Form>
          <Grid columns={2} stackable>
            <PostText onChange={this.updateDescription} description={this.state.description}></PostText>
            <BeachReport updateBeachReport={this.updateBeachReport}></BeachReport>
            <WindStatus updateWindStatus={this.updateWindStatus}></WindStatus>
            <TagDropdown></TagDropdown>
            <LinkTable updateLinks={this.updateLinks}></LinkTable>
            <SavePostButton
              postId={this.state.postId}
              description={this.state.description}
              beachReport={this.state.beachReport}
              windStatus={this.state.windStatus}
              links={this.state.links}
            >
            </SavePostButton>
            
          </Grid>
        </Form>
      </div>
    )
  }

}

export default NewPost
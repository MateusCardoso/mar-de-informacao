import React from 'react'
import { 
    Grid,
    Header,
    Label,
    Form,
    Input,
    Dropdown
} from "semantic-ui-react";

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

class BeachReport extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reportId: null,
            waterQuality: '',
            temperature: '',
            fishingConditions: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount(){
        const reportId = await this.createBeachreport();
        this.setState({ reportId: reportId });
        this.props.updateBeachReport('reportId', reportId)
    }

    async createBeachreport(){
        const postId = await this.props.postId;
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({postId: postId})
        };
    
        const response = await fetch(process.env.REACT_APP_API_URL+'/reports', requestOptions);
        const data = await response.json();
        return (data.id);
      }

    handleInputChange(evt) {
        const value = evt.target.value;
        const name = evt.target.name;

        this.setState({
            [name]: value
        });

        this.props.updateBeachReport(name,value);
    }

    render() {
        return(
            <Grid.Column>
                <Header as='h4' content='Reporte do Mar:' textAlign='left' />
                <Form.Field>
                    <Label>Qualidade da Agua</Label>
                    <Input fluid 
                        name='waterQuality'
                        placeholder='Qualidade...'
                        onChange={this.handleInputChange}
                        value={this.state.waterQuality}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>Temperatura</Label>
                    <Input fluid
                        name='temperature'
                        label={{ basic: true, content: '°C' }}
                        labelPosition='right'
                        placeholder='Graus...'
                        onChange={this.handleInputChange}
                        value={this.state.temperature}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>Nota para Pescaria</Label>
                    <Dropdown
                        name='fishingConditions'
                        placeholder='Nota...'
                        fluid
                        selection
                        options={stars}
                        onChange={this.handleInputChange}
                        value={this.state.fishingConditions}
                    />
                </Form.Field>
            </Grid.Column>
        )
    }
}
 export default BeachReport
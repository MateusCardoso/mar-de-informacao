import React from 'react'
import { 
    Grid,
    Header,
    Label,
    Form,
    Input
} from "semantic-ui-react";

class BeachReport extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reportId: null,
            waterQuality: '',
            temperature: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
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
            </Grid.Column>
        )
    }
}
 export default BeachReport
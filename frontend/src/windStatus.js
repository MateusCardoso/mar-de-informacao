import React from 'react'
import { 
    Grid,
    Header,
    Label,
    Form,
    Input,
} from "semantic-ui-react";

import fieldLabels from './fieldLabel';

class WindStatus extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            windId: null,
	        windDirection: '',
            windVelocity: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(evt) {
        const value = evt.target.value;
        const name = evt.target.name;

        this.setState({
            [name]: value
        });

        this.props.updateWindStatus(name,value);
    }

    render() {
        return(
            <Grid.Column>
                <Header as='h4' content='Vento:' textAlign='left' />
                <Form.Field>
                    <Label>{fieldLabels.windDirection}</Label>
                    <Input fluid
                        name='windDirection'
                        placeholder='Direçao...'
                        onChange={this.handleInputChange}
                        value={this.state.windDirection}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>{fieldLabels.windVelocity}</Label>
                    <Input fluid
                        name='windVelocity'
                        label={{ basic: true, content: 'Km/h' }}
                        labelPosition='right'
                        placeholder='Velocidade...'
                        onChange={this.handleInputChange}
                        value={this.state.windVelocity}
                    />
                </Form.Field>
            </Grid.Column>
        )
    }
}
 export default WindStatus
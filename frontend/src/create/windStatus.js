import { 
    Grid,
    Header,
    Label,
    Form,
    Input,
} from "semantic-ui-react";

import fieldLabels from '../common/fieldLabel';

function WindStatus (props){
    
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        props.updateWindStatus(name,value);
    }

    return  <Grid.Column>
                <Header as='h4' content='Vento:' textAlign='left' />
                <Form.Field>
                    <Label>{fieldLabels.windDirection}</Label>
                    <Input fluid
                        name='windDirection'
                        placeholder='Direçao...'
                        onChange={handleInputChange}
                        value={props.windStatus.windDirection || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>{fieldLabels.windVelocity}</Label>
                    <Input fluid
                        name='windVelocity'
                        label={{ basic: true, content: 'Km/h' }}
                        labelPosition='right'
                        placeholder='Velocidade...'
                        onChange={handleInputChange}
                        value={props.windStatus.windVelocity || ''}
                    />
                </Form.Field>
            </Grid.Column>
}
 export default WindStatus
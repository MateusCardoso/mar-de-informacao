import { 
    Grid,
    Header,
    Label,
    Form,
    Input
} from "semantic-ui-react";

import fieldLabels from './fieldLabel';

function BeachReport (props){
   
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        props.updateBeachReport(name,value);
    }

    return  <Grid.Column>
                <Header as='h4' content='Reporte do Mar:' textAlign='left' />
                <Form.Field>
                    <Label>{fieldLabels.waterQuality}</Label>
                    <Input fluid 
                        name='waterQuality'
                        placeholder='Qualidade...'
                        onChange={handleInputChange}
                        value={props.beachReport.waterQuality || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>{fieldLabels.temperature}</Label>
                    <Input fluid
                        name='temperature'
                        label={{ basic: true, content: '°C' }}
                        labelPosition='right'
                        placeholder='Graus...'
                        onChange={handleInputChange}
                        value={props.beachReport.temperature || ''}
                    />
                </Form.Field>
            </Grid.Column>
}

export default BeachReport
import { 
    Grid,
    Header,
    Label,
    Form,
    Input
} from "semantic-ui-react";

import fieldLabels from '../common/fieldLabel';

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
                        type='number'
                        value={props.beachReport.temperature || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>{fieldLabels.rainVolume}</Label>
                    <Input fluid
                        name='rainVolume'
                        label={{ basic: true, content: 'mm' }}
                        labelPosition='right'
                        placeholder='Volume...'
                        onChange={handleInputChange}
                        type='number'
                        value={props.beachReport.rainVolume || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>{fieldLabels.fishCatched}</Label>
                    <Input fluid
                        name='fishCatched'
                        placeholder='Nome...'
                        onChange={handleInputChange}
                        value={props.beachReport.fishCatched || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>{fieldLabels.fishQuantity}</Label>
                    <Input fluid
                        name='fishQuantity'
                        label={{ basic: true, content: 'Kg' }}
                        labelPosition='right'
                        placeholder='Quantidade...'
                        onChange={handleInputChange}
                        type='number'
                        value={props.beachReport.fishQuantity || ''}
                    />
                </Form.Field>
            </Grid.Column>
            
}

export default BeachReport
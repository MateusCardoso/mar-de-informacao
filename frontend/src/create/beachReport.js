import { 
    Grid,
    Header,
    Label,
    Form,
    Input
} from "semantic-ui-react";

import { fieldLabels, placeholders, sectionHeaders, units } from '../common/fieldLabel';

function BeachReport (props){
   
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        props.updateBeachReport(name,value);
    }

    return  <Grid.Column>
                <Header as='h4' content={sectionHeaders.beachReportSection} textAlign='left' />
                <Form.Field>
                    <Label>{fieldLabels.waterQuality}</Label>
                    <Input fluid 
                        name='waterQuality'
                        placeholder={placeholders.waterQuality}
                        onChange={handleInputChange}
                        value={props.beachReport.waterQuality || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>{fieldLabels.temperature}</Label>
                    <Input fluid
                        name='temperature'
                        label={{ basic: true, content: units.temperature }}
                        labelPosition='right'
                        placeholder={placeholders.temperature}
                        onChange={handleInputChange}
                        type='number'
                        value={props.beachReport.temperature || ''}
                    />
                </Form.Field>
                <Header as='h4' content={sectionHeaders.precipitation} textAlign='left' />
                <Form.Field>
                    <Label>{fieldLabels.rainVolume}</Label>
                    <Input fluid
                        name='rainVolume'
                        label={{ basic: true, content: units.rainVolume }}
                        labelPosition='right'
                        placeholder={placeholders.rainVolume}
                        onChange={handleInputChange}
                        type='number'
                        value={props.beachReport.rainVolume || ''}
                    />
                </Form.Field>
                <Header as='h4' content={sectionHeaders.fishing} textAlign='left' />
                <Form.Field>
                    <Label>{fieldLabels.fishCatched}</Label>
                    <Input fluid
                        name='fishCatched'
                        placeholder={placeholders.fishCatched}
                        onChange={handleInputChange}
                        value={props.beachReport.fishCatched || ''}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>{fieldLabels.fishQuantity}</Label>
                    <Input fluid
                        name='fishQuantity'
                        label={{ basic: true, content: units.quantity }}
                        labelPosition='right'
                        placeholder={placeholders.fishQuantity}
                        onChange={handleInputChange}
                        type='number'
                        value={props.beachReport.fishQuantity || ''}
                    />
                </Form.Field>
            </Grid.Column>
            
}

export default BeachReport
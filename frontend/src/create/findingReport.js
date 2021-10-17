import { 
    Grid,
    Header,
    Label,
    Form,
    Input
} from "semantic-ui-react";

import { fieldLabels, units, placeholders, sectionHeaders } from '../common/fieldLabel';


function FindingReport (props) {
    
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        props.updateFindingReport(name,value);
    }

    return  <Grid.Row>
                <Grid.Column>
                    <Header as='h4' content={sectionHeaders.animalFinding} textAlign='left' />
                    <Form.Field>
                        <Label>{fieldLabels.animalName}</Label>
                        <Input fluid 
                            name='animalName'
                            placeholder={placeholders.animalName}
                            onChange={handleInputChange}
                            value={props.findingReport.animalName || ''}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>{fieldLabels.animalSpecies}</Label>
                        <Input fluid
                            name='animalSpecies'
                            placeholder={placeholders.animalSpecies}
                            onChange={handleInputChange}
                            value={props.findingReport.animalSpecies || ''}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column>
                    <Header as='h4' content={sectionHeaders.garbageFinding} textAlign='left' />
                    <Form.Field>
                        <Label>{fieldLabels.garbageOrigin}</Label>
                        <Input fluid
                            name='garbageOrigin'
                            placeholder={placeholders.garbageOrigin}
                            onChange={handleInputChange}
                            value={props.findingReport.garbageOrigin || ''}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>{fieldLabels.garbageQuantity}</Label>
                        <Input fluid
                            name='garbageQuantity'
                            label={{ basic: true, content: units.quantity }}
                            labelPosition='right'
                            placeholder={placeholders.garbageQuantity}
                            onChange={handleInputChange}
                            type='number'
                            value={props.findingReport.garbageQuantity || ''}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
}

export default FindingReport;
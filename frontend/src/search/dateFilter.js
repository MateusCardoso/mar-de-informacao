import { Grid, Form, Label } from 'semantic-ui-react'

import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { fieldLabels } from '../common/fieldLabel';

function DateFilter (props){

    return  <Grid.Column>
                <Form.Field>
                    <Label>{fieldLabels.publicationDate}</Label>
                    <SemanticDatepicker 
                        locale="pt-BR" 
                        datePickerOnly
                        fluid
                        format='DD MMM, YYYY'
                        type='range'
                        onChange={(_event, data) => props.setDateRange(data.value)} 
                        value={props.dateRange} />
                </Form.Field>
            </Grid.Column>

}

export default DateFilter;
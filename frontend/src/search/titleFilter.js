import { Grid, Form, Label, Input } from 'semantic-ui-react'
import fieldLabels from '../common/fieldLabel';

function TitleFilter (props) {

    return <Grid.Column>
            <Form.Field>
                <Label content={fieldLabels.postTitle}/>
                <Input
                    fluid 
                    onChange={(_evt,data) => {props.setTitleFilter(data.value)}}
                    value={props.titleFilter}
                />
            </Form.Field>
        </Grid.Column>
}

export default TitleFilter;
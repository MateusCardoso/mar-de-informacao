import { useState } from 'react';
import { 
    Form,
    Input,
    Table,
    Button,
} from 'semantic-ui-react';
import { placeholders } from '../common/fieldLabel';

function Link (props){

    const [toBeDeleted, setToBeDeleted] = useState(false)
    
    const handleInputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        props.updateLinkData(props.link.tableLine, name, value);
    }

    const toggleLineToDelete = () => {
        const value = !toBeDeleted;
        setToBeDeleted(value);
        props.updateLinkData(props.link.tableLine, 'toBeDeleted', value);
    }

    return  <Table.Row> 
                <Table.Cell>
                    <Form.Field>
                        <Input
                            fluid
                            disabled={toBeDeleted}
                            name='linkName'
                            placeholder={placeholders.linkName}
                            value={props.link.linkName || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                </Table.Cell>
                <Table.Cell>
                    <Form.Field>
                        <Input 
                            fluid
                            disabled={toBeDeleted}
                            name='url'
                            placeholder={placeholders.linkURL}
                            value={props.link.url || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                </Table.Cell>
                <Table.Cell collapsing={true}>
                    <Button
                        name='delete'
                        icon={toBeDeleted ? 'repeat' : 'delete'}
                        negative={!(toBeDeleted)}
                        positive={(toBeDeleted)}
                        onClick={toggleLineToDelete}
                    >
                    </Button>
                </Table.Cell>
            </Table.Row>
}
 export default Link
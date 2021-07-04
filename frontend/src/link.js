import React from 'react'
import { 
    Form,
    Input,
    Table,
    Button,
} from 'semantic-ui-react';

class Link extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            key: props.key,
            tableLine: props.tableLine,
            linkId: props.linkId,
            name: props.name,
            url: props.url,
            toBeDeleted: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleLineToDelete = this.toggleLineToDelete.bind(this);
    }

    handleInputChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;

        this.setState({
            [name]: value
        });
    }

    toggleLineToDelete(){
        this.setState({
            toBeDeleted: !(this.state.toBeDeleted)
        })
    }

    render() {
        return(
            <Table.Row> 
                <Table.Cell>
                    <Form.Field>
                        <Input
                            fluid
                            disabled={this.state.toBeDeleted}
                            name='name'
                            placeholder='Nome...'
                            value={this.state.name}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                </Table.Cell>
                <Table.Cell>
                    <Form.Field>
                        <Input 
                            fluid
                            disabled={this.state.toBeDeleted}
                            name='url'
                            placeholder='URL...'
                            value={this.state.url}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                </Table.Cell>
                <Table.Cell collapsing={true}>
                    <Button
                    name='delete'
                    icon={this.state.toBeDeleted ? 'repeat' : 'delete'}
                    negative={!(this.state.toBeDeleted)}
                    positive={(this.state.toBeDeleted)}
                    onClick={this.toggleLineToDelete}
                    >
                    </Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}
 export default Link
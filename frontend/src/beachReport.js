import React from 'react'
import { 
    Grid,
    Header,
    Label,
    Form,
    Input,
    Dropdown
} from "semantic-ui-react";

const stars = [
    {
      key: '1',
      text: '1',
      value: '1',
    },
    {
      key: '2',
      text: '2',
      value: '2',
    },
    {
      key: '3',
      text: '3',
      value: '3',
    },
    {
      key: '4',
      text: '4',
      value: '4',
    },
    {
      key: '5',
      text: '5',
      value: '5',
    },
  ]

class BeachReport extends React.Component{
    constructor(props){
        super(props);
        this.updateWaterQuality = this.updateWaterQuality.bind(this);
    }

    updateWaterQuality(evt) {
        this.props.updateBeachReport({waterQuality: evt.target.value});
    }

    render() {
        return(
            <Grid.Column>
                <Header as='h4' content='Reporte do Mar:' textAlign='left' />
                <Form.Field>
                    <Label>Qualidade da Agua</Label>
                    <Input fluid 
                        placeholder='Qualidade...'
                        onChange={this.updateWaterQuality}
                        value={this.props.beachReport.waterQuality}
                    />
                </Form.Field>
                <Form.Field>
                    <Label>Temperatura</Label>
                    <Input fluid
                        label={{ basic: true, content: '°C' }}
                        labelPosition='right'
                        placeholder='Graus...'
                    />
                </Form.Field>
                <Form.Field>
                    <Label>Nota para Pescaria</Label>
                    <Dropdown
                        placeholder='Nota...'
                        fluid
                        selection
                        options={stars}
                    />
                </Form.Field>
            </Grid.Column>
        )
    }
}
 export default BeachReport
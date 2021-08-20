import React from 'react'
import { 
    Grid,
    Header,
    Form,
    Label,
    Dropdown
    // Table,
    // Button,
    // Icon
} from 'semantic-ui-react';

// import Link from './link';

const tags = [
    {
      key: '1',
      text: 'Pescaria',
      value: '1',
    },
    {
      key: '2',
      text: 'Lixo no Mar',
      value: '2',
    },
    {
        key: '3',
        text: 'Animais',
        value: '3',
    }
]

class TagMultiselect extends React.Component{
    constructor(props){
        super(props);
        // this.state = {
        //     lastLine: 0
        // }

        // this.addLink = this.addLink.bind(this);
        // this.updateLinkData = this.updateLinkData.bind(this);
        // this.updatecreateLinkLinkData = this.createLink.bind(this);
    }

    // renderLinks(props){
    //     const links = props;
    //     return(
    //         links.map((link)=>
    //             <Link 
    //                 key={link.tableLine} 
    //                 tableLine={link.tableLine}
    //                 linkId={link.linkId}
    //                 linkName={link.linkName}
    //                 url={link.url}
    //                 updateLinkData={this.updateLinkData}
    //             ></Link>
    //     ))
    // }

    // addLink(){
    //     var links = this.props.links;
    //     const lastLine = this.state.lastLine;
    //     const newLink = {
    //         linkId: null,
    //         key: lastLine,
    //         tableLine: lastLine,
    //         linkName: '',
    //         url: ''
    //     }
    //     const newLinkId = this.createLink(newLink); 
    //     newLink.linkId = newLinkId;
    //     links.push(newLink);
    //     this.setState({
    //         lastLine: lastLine + 1
    //     });
    // }

    // updateLinkData(tableLine,name,value){
    //     var linkToUpdate = this.props.links.find(link => link.tableLine === tableLine);
    //     linkToUpdate[name] = value;
    // }

    // async createLink(link){
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             tableLine: link.tableLine
    //         })
    //     };
    //     const response = await fetch(process.env.REACT_APP_API_URL+'/links', requestOptions);
    //     const data = await response.json();
    //     return (data.id);
        
    // }

    render() {
        return(
        <Grid.Column>
            <Header as='h4' content='Categoria do Post:' textAlign='left'/>
                <Form.Field>
                    <Label>Tags de Busca</Label>
                    <Dropdown
                        allowAdditions
                        clearable
                        fluid
                        multiple
                        search
                        selection
                        options={tags}
                        placeholder='Tags...'
                    />
                </Form.Field>
        </Grid.Column>
        )
    }
}
 export default TagMultiselect
import React from 'react'
import {
  Header,
  Segment
} from 'semantic-ui-react'

class SearchPost extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Segment padded='very' inverted color='grey'>
                <Header as='h1' content='Buscar Posts' textAlign='left' />
                </Segment>
            </div>
        );
    }
}

export default SearchPost
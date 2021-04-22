import { 
    Grid,
    Button
} from "semantic-ui-react";

class SavePostButton extends Button{
    constructor(props){
        super(props);
        this.updatePost = this.updatePost.bind(this);
    }

    async updatePost() {
        const postId = await this.props.postId;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: postId, 
                description: this.props.description,
                beachReport: {
                    id: this.props.beachReport.reportId,
                    waterQuality: this.props.beachReport.waterQuality,
                    temperature: this.props.beachReport.temperature,
                    fishingConditions: this.props.beachReport.fishingConditions
                  }
            })
        };
        fetch(process.env.REACT_APP_API_URL+'/posts/'+postId, requestOptions)
            .catch((error) => {
                console.error('Error:', error);
            });        
    }
    
    render() {
        return(
            <Grid.Row>
              <Button onClick={this.updatePost}>Salvar</Button>
            </Grid.Row>
        )
    }

}
 export default SavePostButton
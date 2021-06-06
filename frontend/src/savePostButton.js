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
        const requestOptionsUpdateDescription = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: postId, 
                description: this.props.description,
            })
        };
        const reportId = await this.props.beachReport.reportId;
        const requestOptionsUpdateBeachReport = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: reportId,
                waterQuality: this.props.beachReport.waterQuality,
                temperature: this.props.beachReport.temperature,
                fishingConditions: this.props.beachReport.fishingConditions
            })
        };
        try{
            fetch(process.env.REACT_APP_API_URL+'/posts/'+postId, requestOptionsUpdateDescription),
            fetch(process.env.REACT_APP_API_URL+'/reports/'+reportId, requestOptionsUpdateBeachReport)
        }
        catch(error){
            console.error('Error:', error);
        };   
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
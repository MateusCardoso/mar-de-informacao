import { 
    Grid,
    Button
} from "semantic-ui-react";

class SavePostButton extends Button{
    constructor(props){
        super(props);
        this.updatePost = this.updatePost.bind(this);
        this.updateBeachReport = this.updateBeachReport.bind(this);
    }

    async updatePost() {
        const postId = await this.props.postId;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: postId, description: this.props.description })
        };
        fetch(process.env.REACT_APP_API_URL+'/posts/'+postId, requestOptions)
            .then(this.updateBeachReport())
            .catch((error) => {
                console.error('Error:', error);
            });        
    }

    async updateBeachReport() {
        const postId = await this.props.postId;
        const reportId = await this.props.beachReport.reportId;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: reportId, 
                postId: postId,
                waterQuality: this.props.beachReport.waterQuality, 
                temperature: this.props.beachReport.temperature,
                fishingConditions: this.props.beachReport.fishingConditions
            })
          };
          fetch(process.env.REACT_APP_API_URL+'/reports/'+reportId, requestOptions)
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
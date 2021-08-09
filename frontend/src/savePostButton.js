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
        const requestOptionsUpdateDescription = this.buildRequestOptions('PATCH',this.requestBodyForPost(postId));

        const reportId = await this.props.beachReport.reportId;
        const requestOptionsUpdateBeachReport = this.buildRequestOptions('PATCH',this.requestBodyForBeachReport(reportId));

        const windId = await this.props.windStatus.windId;
        const requestOptionsUpdateWindStatus = this.buildRequestOptions('PATCH',this.requestBodyForWindStatus(windId));
        
        try{
            fetch(process.env.REACT_APP_API_URL+'/posts/'+postId, requestOptionsUpdateDescription),
            fetch(process.env.REACT_APP_API_URL+'/reports/'+reportId, requestOptionsUpdateBeachReport),
            fetch(process.env.REACT_APP_API_URL+'/windStatus/'+windId, requestOptionsUpdateWindStatus)
        }
        catch(error){
            console.error('Error:', error);
        };
        
        await this.updateLinks();
    }

    async updateLinks(){
        const links = this.props.links;

        for(const link of links){
            let linkId = await link.linkId;
            var requestOptionsLink = this.buildRequestOptions('PATCH', this.requestBodyForLink(linkId,link));
            try{
                fetch(process.env.REACT_APP_API_URL+'/links/'+linkId, requestOptionsLink)
            }
            catch(error){
                console.error('Error:', error);
            }
        }
    }

    buildRequestOptions(method,body){
        return {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: body
        };
    }

    requestBodyForPost(id){
        return (
            JSON.stringify({ 
                id: id, 
                description: this.props.description
            })
        )
    }

    requestBodyForBeachReport(id){
        return (
            JSON.stringify({ 
                id: id,
                waterQuality: this.props.beachReport.waterQuality,
                temperature: this.props.beachReport.temperature,
                fishingConditions: this.props.beachReport.fishingConditions
            })
        )
    }

    requestBodyForWindStatus(id){
        return (
            JSON.stringify({ 
                id: id,
                windDirection: this.props.windStatus.windDirection,
                windVelocity: this.props.windStatus.windVelocity
            })
        )
    }

    requestBodyForLink(id,link){
        return (
            JSON.stringify({ 
                id: id,
                key: link.key,
                tableLine: link.tableLine,
                linkName: link.linkName,
                url: link.url
            })
        )
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
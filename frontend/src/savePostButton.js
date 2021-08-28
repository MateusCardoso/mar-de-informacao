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

        const tagIds = await this.getTagIds();
        const requestOptionsUpdateTags = this.buildRequestOptions('PATCH');
        
        try{
            fetch(process.env.REACT_APP_API_URL+'/posts/'+postId, requestOptionsUpdateDescription),
            fetch(process.env.REACT_APP_API_URL+'/posts/'+postId+'/tags?tagIds='+tagIds, requestOptionsUpdateTags),
            fetch(process.env.REACT_APP_API_URL+'/reports/'+reportId, requestOptionsUpdateBeachReport),
            fetch(process.env.REACT_APP_API_URL+'/windStatus/'+windId, requestOptionsUpdateWindStatus)
        }
        catch(error){
            console.error('Error:', error);
        };
        
        await this.updateLinks();
    }

    async updateLinks(){
        var links = this.props.links;
        var remainingLinks = [];
        for(const link of links){
            let linkId = await link.linkId;
            let restMethod = link.toBeDeleted ? 'DELETE' : 'PATCH';
            var requestOptionsLink = this.buildRequestOptions(restMethod, this.requestBodyForLink(linkId,link));
            try{
                fetch(process.env.REACT_APP_API_URL+'/links/'+linkId, requestOptionsLink)
            }
            catch(error){
                console.error('Error:', error);
            }
            if(!link.toBeDeleted){
                remainingLinks.push(link);
            }
        }
        this.props.updateLinksTable(remainingLinks);
    }

    async getTagIds(){
        const tags = this.props.tags;
        var tagIds = [];
        for(const tag of tags){
            let tagId = await tag.tagId;
            tagIds.push(tagId);
        }
        return(tagIds.join());
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
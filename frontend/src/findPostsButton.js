import { 
    Grid,
    Button
} from "semantic-ui-react";

class FindPostsButton extends Button{
    constructor(props){
        super(props);
        this.findPosts = this.findPosts.bind(this);
    }

    async findPosts() {
        const tagIds = await this.getTagIds();
        const requestOptionsUpdateTags = this.buildRequestOptions('GET');
        
        if( tagIds !== ""){
            const response = await fetch(process.env.REACT_APP_API_URL+'/posts/byTags?tagIds='+tagIds, requestOptionsUpdateTags);
            const data = await response.json();
            this.props.updatePostsList(data);
        }else{
            const allPosts = await this.props.resetPostList();
            this.props.updatePostsList(allPosts);
        }
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

    buildRequestOptions(method){
        return {
            method: method
        };
    }
    
    render() {
        return(
            <Grid.Row>
              <Button onClick={this.findPosts}>Procurar</Button>
            </Grid.Row>
        )
    }

}
 export default FindPostsButton

async function UpdatePost (props) {
    
    const getTagIds = async () => {
        const tags = props.tags;
        var tagIds = [];
        for(const tag of tags){
            let tagId = await tag.id;
            tagIds.push(tagId);
        }
        return(tagIds.join());
    }

    const buildRequestOptions = (method,body) => {
        return {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: body
        };
    }

    const requestBodyForPost = (post) => {
        return (
            JSON.stringify({ 
                id: post.id,
                title: post.title, 
                description: post.description
            })
        )
    }

    const requestBodyForBeachReport = (beachReport) => {
        return (
            JSON.stringify({ 
                id: beachReport.id,
                waterQuality: beachReport.waterQuality,
                temperature: beachReport.temperature,
                rainVolume: beachReport.rainVolume,
                fishCatched: beachReport.fishCatched,
                fishQuantity: beachReport.fishQuantity
            })
        )
    }

    const requestBodyForFindingReport = (findingReport) => {
        return (
            JSON.stringify({ 
                id: findingReport.id,
                animalName: findingReport.animalName,
                animalSpecies: findingReport.animalSpecies,
                garbageOrigin: findingReport.garbageOrigin,
                garbageQuantity: findingReport.garbageQuantity
            })
        )
    }

    const requestBodyForWindStatus = (windStatus) => {
        return (
            JSON.stringify({ 
                id: windStatus.id,
                windDirection: windStatus.windDirection,
                windVelocity: windStatus.windVelocity
            })
        )
    }

    const requestBodyForLink = (link) => {
        return (
            JSON.stringify({ 
                id: link.id,
                key: link.key,
                tableLine: link.tableLine,
                linkName: link.linkName,
                url: link.url
            })
        )
    }

    const updateLinks = async () => {
        var remainingLinks = [];
        for(const link of props.links){
            let restMethod = link.toBeDeleted ? 'DELETE' : 'PATCH';
            var requestOptionsLink = buildRequestOptions(restMethod, requestBodyForLink(link));
            try{
                fetch(process.env.REACT_APP_API_URL+'/links/'+link.id, requestOptionsLink)
            }
            catch(error){
                console.error('Error:', error);
            }
            if(!link.toBeDeleted){
                remainingLinks.push(link);
            }
        }
        props.updateLinksTable(remainingLinks);
    }
    
    const postId = await props.post.id;
    const requestOptionsUpdateDescription = buildRequestOptions('PATCH',requestBodyForPost(props.post));

    const reportId = await props.post.beachReport.id;
    const requestOptionsUpdateBeachReport = buildRequestOptions('PATCH',requestBodyForBeachReport(props.post.beachReport));

    const findingId = await props.post.findingReport.id;
    const requestOptionsUpdateFindingReport = buildRequestOptions('PATCH',requestBodyForFindingReport(props.post.findingReport));

    const windId = await props.post.beachReport.windStatus.id;
    const requestOptionsUpdateWindStatus = buildRequestOptions('PATCH',requestBodyForWindStatus(props.post.beachReport.windStatus));

    const tagIds = await getTagIds();
    const requestOptionsUpdateTags = buildRequestOptions('PATCH');
    
    try{
        fetch(process.env.REACT_APP_API_URL+'/posts/'+postId, requestOptionsUpdateDescription),
        fetch(process.env.REACT_APP_API_URL+'/posts/'+postId+'/tags?tagIds='+tagIds, requestOptionsUpdateTags),
        fetch(process.env.REACT_APP_API_URL+'/reports/'+reportId, requestOptionsUpdateBeachReport),
        fetch(process.env.REACT_APP_API_URL+'/findings/'+findingId, requestOptionsUpdateFindingReport),
        fetch(process.env.REACT_APP_API_URL+'/windStatus/'+windId, requestOptionsUpdateWindStatus)
    }
    catch(error){
        console.error('Error:', error);
    };
    
    await updateLinks();
}

export default UpdatePost;
import moment from 'moment';

async function RetrievePosts (props) {

    const formatAndSetPosts = (data) => {
        var posts = [];
        for(const post of data){
            posts.push({
                id: post.id,
                title: post.title,
                description: post.description,
                waterQuality: post.beachReport.waterQuality,
                temperature: post.beachReport.temperature,
                windDirection: post.beachReport.windStatus.windDirection,
                windVelocity: post.beachReport.windStatus.windVelocity,
                publicationDateTime: post.publicationDateTime ? moment(parseDate(post.publicationDateTime)).format('DD MMM, YYYY - HH:mm:ss' ) : null
            })
        }
        props.setPosts(posts);
    };

    const parseDate = (publicationDateTime) => {
        return ({
            year:   publicationDateTime[0],
            month:  publicationDateTime[1]-1,
            day:    publicationDateTime[2],
            hour:   publicationDateTime[3],
            minute: publicationDateTime[4],
            second: publicationDateTime[5],
        })
    };

    const requestOptions = {
        method: 'GET'
    };
    const orderedBy = props.orderedBy;
    let tagFilter = props.filters ? props.filters.find(x => x.name == 'tagIds' ) : null;
    var data;
    if( tagFilter !== undefined && tagFilter !== null){
        const tagIds = tagFilter.value;
        const response = orderedBy.entity !== '' 
        ? await fetch(process.env.REACT_APP_API_URL+'/posts/byTags?tagIds='+tagIds+'&entityName='+orderedBy.entity+'&field='+orderedBy.field+'&order='+orderedBy.order, requestOptions) 
        : orderedBy.field !== '' 
        ? await fetch(process.env.REACT_APP_API_URL+'/posts/byTags?tagIds='+tagIds+'&field='+orderedBy.field+'&order='+orderedBy.order, requestOptions) 
        : await fetch(process.env.REACT_APP_API_URL+'/posts/byTags?tagIds='+tagIds, requestOptions);
        
        data = await response.json();
    }else{
        const response = orderedBy.entity !== '' 
        ? await fetch(process.env.REACT_APP_API_URL+'/posts/orderedBy?entityName='+orderedBy.entity+'&field='+orderedBy.field+'&order='+orderedBy.order, requestOptions) 
        : orderedBy.field !== '' 
        ? await fetch(process.env.REACT_APP_API_URL+'/posts/orderedBy?field='+orderedBy.field+'&order='+orderedBy.order, requestOptions) 
        : await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions);
        data = await response.json();
    }
    formatAndSetPosts(data);

}

export default RetrievePosts;
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
                rainVolume: post.beachReport.rainVolume,
                fishCatched: post.beachReport.fishCatched,
                fishQuantity: post.beachReport.fishQuantity,
                windDirection: post.beachReport.windStatus.windDirection,
                windVelocity: post.beachReport.windStatus.windVelocity,
                publicationDate: post.publicationDate ? moment(post.publicationDate).format('DD MMM, YYYY' ) : null
            })
        }
        props.setPosts(posts);
    };

    const buildFilters = () => {
        var joinedFilter = props.filters.reduce((filterString, filter) => {
            if(filter.value.length !== 0){
                if(Array.isArray(filter.value)){
                    filterString.push(filter.name+'='+filter.value.join());
                }else{
                    filterString.push(filter.name+'='+filter.value);
                }
            }
            return filterString;
        }, []);
        return joinedFilter.join('&');
    };

    const buildOrderedBy = () => {
        const orderedBy = props.orderedBy;
        var joinedOrder = [];
        orderedBy.entity ? joinedOrder.push('entityName='+orderedBy.entity) : null;
        orderedBy.field ? joinedOrder.push('field='+orderedBy.field) : null;
        orderedBy.order ? joinedOrder.push('order='+orderedBy.order) : null;
        return joinedOrder.join('&');
    };

    const requestOptions = {
        method: 'GET'
    };
    const allFilters =  buildFilters();
    const orderFields = buildOrderedBy();
    const response = allFilters.length !== 0 ? 
            orderFields.length !== 0 
                ? await fetch(process.env.REACT_APP_API_URL+'/posts/filteredBy?'+allFilters+'&'+orderFields, requestOptions) 
                : await fetch(process.env.REACT_APP_API_URL+'/posts/filteredBy?'+allFilters, requestOptions)
            : orderFields.length !== 0 
                ? await fetch(process.env.REACT_APP_API_URL+'/posts/orderedBy?'+orderFields, requestOptions) 
                : await fetch(process.env.REACT_APP_API_URL+'/posts', requestOptions)
        ;
        
    const data = await response.json();

    formatAndSetPosts(data);

}

export default RetrievePosts;
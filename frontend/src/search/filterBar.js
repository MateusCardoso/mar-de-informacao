import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'

import TagMultiselect from '../common/tagMultiselect';
import DateFilter from './dateFilter';
import FindPostsButton from './findPostsButton';

function FilterBar (props) {

    const renderFilters = () => {
        return(
        <Grid columns={4}> 
            <TagMultiselect updateTagsList={props.setTags} allowAdditions={false} noHeader={true} tags={props.tags}/>
            <DateFilter setDate={props.setDate} date={props.date}/>
        </Grid>
        )
    }

    return <Segment fluid='true'>
                <Header as='h4' content='Filtros:' textAlign='left' />
                {renderFilters()}
                <Segment vertical>
                    <FindPostsButton
                        tags={props.tags}
                        getPosts={props.getPosts}
                    >
                    </FindPostsButton>
                </Segment>

            </Segment>
}

export default FilterBar;
import {
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'

import TagMultiselect from '../common/tagMultiselect';
import DateFilter from './dateFilter';
import FindPostsButton from './findPostsButton';
import TitleFilter from './titleFilter';

function FilterBar (props) {

    const renderFilters = () => {
        return(
        <Grid columns={4}>
            <TitleFilter titleFilter={props.titleFilter} setTitleFilter={props.setTitleFilter}/> 
            <TagMultiselect updateTagsList={props.setTags} allowAdditions={false} noHeader={true} tags={props.tags}/>
            <DateFilter setDateRange={props.setDateRange} dateRange={props.dateRange}/>
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
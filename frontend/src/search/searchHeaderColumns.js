import React, {useCallback, useEffect} from 'react'
import {Table} from 'semantic-ui-react'

import fieldLabels from "../common/fieldLabel";

function SearchHeaderColumns (props) {
    const renderHeaderColumns = useCallback((columns) => {
        return(
            columns.map((column)=>
                <Table.HeaderCell key={columns.indexOf(column)} content={column.columnName}></Table.HeaderCell>   
        ))
    });

    return <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{fieldLabels.postTitle}</Table.HeaderCell>
                    <Table.HeaderCell>{fieldLabels.postDescription}</Table.HeaderCell>
                    {renderHeaderColumns(props.columns)}
                </Table.Row>
            </Table.Header>

}

export default SearchHeaderColumns;
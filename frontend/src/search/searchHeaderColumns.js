import React, {useCallback} from 'react'
import {Table} from 'semantic-ui-react'

import fieldLabels from "../common/fieldLabel";

function SearchHeaderColumns (props) {
    var orderedBy = props.orderedBy;
    const renderHeaderColumns = useCallback((columns) => {
        return(
            columns.map((column)=>
                <Table.HeaderCell 
                    key={columns.indexOf(column)} 
                    sorted={orderedBy.field === column.columnTechnicalName ? orderedBy.tableOrder : null}
                    onClick={() => changeOrder(column.columnTechnicalName, column.entityName)}
                    content={column.columnName}
                />
        ))
    });

    const changeOrder = (field, entity) => {
        var currentOrder = props.orderedBy;
        if(currentOrder.field === field){
            currentOrder.order = currentOrder.order === '' ? 'DESC' 
                                : currentOrder.order === 'DESC' ? 'ASC'
                                : ''
            currentOrder.tableOrder = currentOrder.tableOrder === '' ? 'descending' 
                                : currentOrder.tableOrder === 'descending' ? 'ascending'
                                : ''
            currentOrder.field = currentOrder.order === '' ? '' : currentOrder.field;
            currentOrder.entity = currentOrder.order === '' ? '' : currentOrder.entity;  
        } else{
            currentOrder.field = field;
            currentOrder.entity = entity;
            currentOrder.order = 'DESC';
            currentOrder.tableOrder = 'descending'
        }
        props.setOrderedBy({...currentOrder});
    };

    return <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={orderedBy.field === 'title' ? orderedBy.tableOrder : null}
                        onClick={() => changeOrder('title', '')}
                        content={fieldLabels.postTitle}
                    />
                    <Table.HeaderCell
                        sorted={orderedBy.field === 'description' ? orderedBy.tableOrder : null}
                        onClick={() => changeOrder('description', '')}
                        content={fieldLabels.postDescription}
                    />
                    {renderHeaderColumns(props.columns)}
                </Table.Row>
            </Table.Header>

}

export default SearchHeaderColumns;
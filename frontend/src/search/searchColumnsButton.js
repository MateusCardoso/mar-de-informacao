import {Dropdown} from "semantic-ui-react";

import fieldLabels from "../common/fieldLabel";

function SearchColumnsButton (props) {
    
    const options = [
        {
            id: 1,
            text: fieldLabels.waterQuality,
            value: 'waterQuality'
        },
        {
            id: 2,
            text: fieldLabels.temperature,
            value: 'temperature'
        },
        {
            id: 3,
            text: fieldLabels.windDirection,
            value: 'windDirection'
        },
        {
            id: 4,
            text: fieldLabels.windVelocity,
            value: 'windVelocity'
        },
        {
            id: 5,
            text: fieldLabels.publicationDateTime,
            value: 'publicationDateTime'
        }
    ];

    const selectColumn = (evt) => {
        var selectedColumns = props.columns.slice();
        if(evt.target.attributes.role !== undefined && evt.target.attributes.role.nodeValue === 'option'){
            const targetId = Number(evt.target.id);
            const optionWithId = options.find(x => x.id === targetId );
            if(optionWithId !== undefined){
                selectedColumns.push({
                    columnName: optionWithId.text,
                    columnTechnicalName: optionWithId.value
                });
            }
        }else if(evt.target.parentNode.attributes.role !== undefined && evt.target.parentNode.attributes.role.nodeValue === 'option'){
            const targetId = Number(evt.target.parentNode.id);
            const optionWithId = options.find(x => x.id === targetId );
            if(optionWithId !== undefined){
                selectedColumns.push({
                    columnName: optionWithId.text,
                    columnTechnicalName: optionWithId.value
                });
            }
        }else if(evt.target.className === 'dropdown icon clear'){
            selectedColumns = [];
        }else if(evt.target.className === 'delete icon'){
            const columnName = evt.target.parentNode.innerText;
            const currentColumns = selectedColumns;
            selectedColumns = currentColumns.filter(x => x.columnName !== columnName);
        }
        props.updateColumns(selectedColumns);
    }

    return <Dropdown
                text='+Colunas'
                icon='settings'
                floating
                labeled
                button
                multiple
                selection
                options={options}
                className='icon'
                onChange={selectColumn}
            />
}
 export default SearchColumnsButton
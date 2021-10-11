import { Component } from "react";
import { 
    Dropdown
} from "semantic-ui-react";

import fieldLabels from "../fieldLabel";

class SearchColumnsButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: [
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
                }
            ],
            selectedColumns: []
        }
        this.selectColumn = this.selectColumn.bind(this);
    }

    selectColumn(evt){
        if(evt.target.attributes.role !== undefined && evt.target.attributes.role.nodeValue === 'option'){
            const options = this.state.options;
            const targetId = Number(evt.target.id);
            const optionWithId = options.find(x => x.id === targetId );
            if(optionWithId !== undefined){
                this.state.selectedColumns.push({
                    columnName: optionWithId.text,
                    columnTechnicalName: optionWithId.value
                });
            }
        }else if(evt.target.parentNode.attributes.role !== undefined && evt.target.parentNode.attributes.role.nodeValue === 'option'){
            const options = this.state.options;
            const targetId = Number(evt.target.parentNode.id);
            const optionWithId = options.find(x => x.id === targetId );
            if(optionWithId !== undefined){
                this.state.selectedColumns.push({
                    columnName: optionWithId.text,
                    columnTechnicalName: optionWithId.value
                });
            }
        }else if(evt.target.className === 'dropdown icon clear'){
            this.state.selectedColumns = [];
        }else if(evt.target.className === 'delete icon'){
            const columnName = evt.target.parentNode.innerText;
            const currentColumns = this.state.selectedColumns;
            this.state.selectedColumns = currentColumns.filter(x => x.columnName !== columnName);
        }
        this.props.updateColumns(this.state.selectedColumns)
    }
    
    render() {
        return(
            <Dropdown
                text='+Colunas'
                icon='settings'
                floating
                labeled
                button
                multiple
                selection
                options={this.state.options}
                className='icon'
                onChange={this.selectColumn}
            >

            </Dropdown>
        )
    }

}
 export default SearchColumnsButton
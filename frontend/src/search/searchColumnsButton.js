import {Dropdown} from "semantic-ui-react";

import { buttons, fieldLabels } from "../common/fieldLabel";

function SearchColumnsButton (props) {
    
    const options = [
        {
            id: 1,
            text: fieldLabels.waterQuality,
            value: 'waterQuality',
            entity: 'beachReport'
        },
        {
            id: 2,
            text: fieldLabels.temperature,
            value: 'temperature',
            entity: 'beachReport'
        },
        {
            id: 3,
            text: fieldLabels.windDirection,
            value: 'windDirection',
            entity: 'beachReport.windStatus'
        },
        {
            id: 4,
            text: fieldLabels.windVelocity,
            value: 'windVelocity',
            entity: 'beachReport.windStatus'
        },
        {
            id: 5,
            text: fieldLabels.publicationDate,
            value: 'publicationDate',
            entity: ''
        },
        {
            id: 6,
            text: fieldLabels.rainVolume,
            value: 'rainVolume',
            entity: 'beachReport'
        },
        {
            id: 7,
            text: fieldLabels.fishCatched,
            value: 'fishCatched',
            entity: 'beachReport'
        },
        {
            id: 8,
            text: fieldLabels.fishQuantity,
            value: 'fishQuantity',
            entity: 'beachReport'
        },
        {
            id: 9,
            text: fieldLabels.animalName,
            value: 'animalName',
            entity: 'findingReport'
        },
        {
            id: 10,
            text: fieldLabels.animalSpecies,
            value: 'animalSpecies',
            entity: 'findingReport'
        },
        {
            id: 11,
            text: fieldLabels.garbageOrigin,
            value: 'garbageOrigin',
            entity: 'findingReport'
        },
        {
            id: 12,
            text: fieldLabels.garbageQuantity,
            value: 'garbageQuantity',
            entity: 'findingReport'
        }
    ];

    const selectColumn = (_evt, data) => {
        const selectedColumns = data.value.reduce((result, value) => {
            const option = options.find(x => x.value === value )
            if(option !== undefined){
                result.push({
                    columnName: option.text,
                    columnTechnicalName: option.value,
                    entityName: option.entity
                })
            }
            return result;
        }, []);
        props.updateColumns(selectedColumns);
    }

    return <Dropdown
                text={buttons.moreColumns}
                icon='settings'
                floating
                labeled
                button
                multiple
                selection
                clearable
                options={options}
                className='icon'
                onChange={selectColumn}
            />
}
 export default SearchColumnsButton
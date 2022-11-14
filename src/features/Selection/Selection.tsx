import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    selectSelection, 
    addSelection,
    removeSelection,
    setPatients,
    addAllSelection,
    removeAllSelection
} from './SelectionSlice';


const Selection: React.FC = () => {  
    const selectionAttr = useAppSelector(selectSelection);
    const dispatch = useAppDispatch();
    const patientsList = selectionAttr.patients; 
    const patientsSelection = selectionAttr.patientsSelection;
    
    return <>
        <div id="selection">Selection</div>
        <p>
            <button className='addAllSelection' onClick={()=> dispatch(addAllSelection()) }>Add all patients</button>  
            <button className='removeAllSelection' onClick={()=> dispatch(removeAllSelection()) } >Remove all patients</button>
        </p>
        <ul>
            {patientsList.map(item => {
                return <li key={item.name}>
                    {item.name}{'   '}
                    {(patientsSelection.includes(item.index))?
                        <button className='removeSelection' 
                        onClick={()=> dispatch(removeSelection(item.index)) }>Remove</button>:
                        <button className='addSelection' 
                        onClick={()=> dispatch(addSelection(item.index)) }>Add</button>}</li>; 
            })}
        </ul>
    </>;
}


export default Selection;
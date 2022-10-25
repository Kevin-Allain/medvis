import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Patient } from '../../interface/Patient';

import {
    stuff,
    selectSelection, 
    addSelection,
    removeSelection,
    setPatients
} from './SelectionSlice';

// interface Props { patients?:Array<Patient>, patientsSelection?:Array<number> }

const Selection: React.FC = () => {  
    const selectionAttr = useAppSelector(selectSelection);
    const dispatch = useAppDispatch();
    // let patientsList = (props.patients)?props.patients.forEach( a => <><li>a.Name</li></>):<></>
    
    // const patientsList: Array<Patient> = (props.patients)?props.patients:[];
    
    const patientsList = selectionAttr.patients; // let patientsSelection: Array<number> = (props.patientsSelection)?props.patientsSelection:[];
    const patientsSelection = selectionAttr.patientsSelection;
    
    return <>
        <div id="selection">Selection</div>
        <ul>
            {patientsList.map(item => {
                // console.log({item});console.log(patientsSelection)
                return <li key={item.name}>
                    {item.name}{'    '}{/* ,{item.index} &nbsp */}
                    {(patientsSelection.includes(item.index))?
                        <button className='removeSelection' 
                        onClick={()=> dispatch(removeSelection(item.index)) }>Remove</button>:
                        <button className='addSelection' 
                        onClick={()=> dispatch(addSelection(item.index)) }>Add</button>}</li>; //  // console.log("button addSelection, ",item.index)
            })}
        </ul>
    </>;
}


export default Selection;
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Patient } from '../../interface/Patient';

import {
    stuff,
    selectSelection,
} from './SelectionSlice';

interface Props {
    patients?:Array<Patient>,
    patientsSelection?:Array<number>
}
  
const AddSelectionComponent = () => {
    return <>
        <button className='addSelectionPatient'>Add</button>
    </>;
}

const RemoveSelectionComponent = () => {
    return <>
        <button className='removeSelectionComponent'>Remove</button>
    </>;
}


const Selection: React.FC<Props> = (props) => {  
    const selectionAttr = useAppSelector(selectSelection);
    const dispatch = useAppDispatch();

    // let patientsList = (props.patients)?props.patients.forEach( a => <><li>a.Name</li></>):<></>
    const patientsList: Array<Patient> = (props.patients)?props.patients:[];
    let patientsSelection: Array<number> = (props.patientsSelection)?props.patientsSelection:[];
    console.log({patientsSelection});
    return <>
        <div id="selection">Selection</div>
        <ul>
            {patientsList.map(item => {
                console.log({item})
                console.log(patientsSelection)
                return <li key={item.name}>{item.name},{item.index} {(patientsSelection.includes(item.index))?<RemoveSelectionComponent></RemoveSelectionComponent>:<AddSelectionComponent></AddSelectionComponent>} </li>;
            })}
        </ul>
    </>;
}


export default Selection;
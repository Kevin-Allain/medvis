import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState, AppThunk } from '../../app/store';
import DoubleSlider from '../DoubleSlider/DoubleSlider';
import { selectFilterMenu } from './FilterMenuSlice';



interface Props {
    // numAttr?: number, // value?: number, // valSelecMin?: number | null, // valSelecMax?: number | null, // min?: number, // max?: number, // attrName?:string, // onChange?: (e: any) => void
    step?: number,
    arrAttr?:[string]
  }
  

const FilterMenu: React.FC<Props> = (props) => {
    const arrAttr = props.arrAttr;

    const selectionAttr = useAppSelector(selectFilterMenu);
    const dispatch = useAppDispatch();



    useEffect(() => {

    }, []); // <- add empty brackets here

    // TODO this approach is dirty and we need to set a reducer for the local JSON (e.g. https://stackoverflow.com/questions/56810264/how-can-i-access-a-local-json-file-with-redux-to-use-throughout-my-react-app)
    return (
        <>
            <DoubleSlider valueName='voluptate'></DoubleSlider>
            <DoubleSlider valueName='aliquip'></DoubleSlider>
            <DoubleSlider valueName='consectetur'></DoubleSlider>
            <DoubleSlider valueName='laboris'></DoubleSlider>            
        </>
    );
}


export default FilterMenu;
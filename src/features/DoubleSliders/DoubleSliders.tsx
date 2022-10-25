import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { RootState, AppThunk } from '../../app/store';
import DoubleSlider from '../DoubleSlider/DoubleSlider';


interface Props {
    // numAttr?: number, // value?: number, // valSelecMin?: number | null, // valSelecMax?: number | null, // min?: number, // max?: number, // attrName?:string, // onChange?: (e: any) => void
    step?: number,
  }
  

const DoubleSliders: React.FC<Props> = (props) => {



    return (
        <>
            <DoubleSlider valueName='voluptate'></DoubleSlider>
            <DoubleSlider valueName='aliquip'></DoubleSlider>
            <DoubleSlider valueName='consectetur'></DoubleSlider>
            <DoubleSlider valueName='laboris'></DoubleSlider>            
        </>
    );
}


export default DoubleSliders;
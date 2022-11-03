import { createAsyncThunk, createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Patient } from '../../interface/Patient';

import dataGenerated from '../../../data/generated.json'

const patients = dataGenerated as Patient[];

export interface SelectionState {
  patients:Array<Patient>,
  patientsSelection:Array<number>
}

const initialState: SelectionState = {
  patients : patients,
  patientsSelection : []
}

// note we could add patients following the logic provided in documentation https://redux.js.org/usage/writing-tests
export const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      stuff:(state) => {  }, // , action: PayloadAction<void>
      addSelection:(state, action: PayloadAction<number>)=>{
        // console.log("addSelection in reducer."); console.log(state.patients, state.patientsSelection, action.payload)
        state.patientsSelection.push(action.payload)
      },
      addAllSelection:(state) =>{
        state.patientsSelection = state.patients.map( a => a.index ) ;
      },
      removeAllSelection:(state) =>{
        state.patientsSelection = [];
      },      
      removeSelection:(state, action: PayloadAction<number>)=>{
        state.patientsSelection = state.patientsSelection.filter( (v) => action.payload !== v)
        // [1,2,4,5,6,6,'a'].filter((v)=>v!==6786478678)
      },
      setPatients:(state, action:PayloadAction<Array<Patient>>)=>{
        state.patients=action.payload;
      },
      // With a payload and a type of sorting, we can implement it based on dates, numbers or alphabetic order
      sortPatients:(state) => {
        state.patients.forEach( 
          a=> a.medTests.forEach( 
            l => l.listRecords = l.listRecords.sort( (u,v) => new Date(u.record).getTime() - new Date(v.record).getTime()  ) ));
      }
    },
  });

  export const { 
    stuff, 
    addAllSelection, 
    removeAllSelection, 
    addSelection, 
    removeSelection, 
    setPatients, 
    sortPatients 
  } = selectionSlice.actions;

  export const selectSelection = 
    (state: RootState) => state.selection;

  export default selectionSlice.reducer;
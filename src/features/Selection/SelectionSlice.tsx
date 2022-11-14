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
    reducers: {
      addSelection:(state, action: PayloadAction<number>)=>{
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
      },
      setPatients:(state, action:PayloadAction<Array<Patient>>)=>{
        state.patients=action.payload;
      },
      sortPatients:(state) => {
        state.patients.forEach( 
          a=> a.medTests.forEach( 
            l => l.listRecords = l.listRecords.sort( (u,v) => new Date(u.record).getTime() - new Date(v.record).getTime()  ) ));
      }
    },
  });

  export const { 
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
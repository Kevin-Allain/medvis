import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

import { Patient } from '../../interface/Patient';

import dataGenerated from '../../../data/generated.json'

const patients = dataGenerated as Patient[];

let arrconcat_voluptate: number [] = [], arrconcat_aliquip: number[] = [], arrconcat_consectetur:number[] = [], arrconcat_laboris:number[] = [];
patients.map(p => p.medTests.map( m=> (m.testName==='voluptate')? arrconcat_voluptate = arrconcat_voluptate.concat( [... m.listRecords.map(r => r.score)] )
    : (m.testName==='aliquip')? arrconcat_aliquip = arrconcat_aliquip.concat( [... m.listRecords.map(r => r.score)]) 
    : (m.testName==='consectetur')? arrconcat_consectetur = arrconcat_consectetur.concat( [... m.listRecords.map(r => r.score)]) 
    :  arrconcat_laboris = arrconcat_laboris.concat( [... m.listRecords.map(r => r.score)]) 
    ) )
const maxEdge_voluptate=Math.max(...arrconcat_voluptate), maxEdge_aliquip=Math.max(...arrconcat_aliquip), maxEdge_consectetur=Math.max(...arrconcat_consectetur), maxEdge_laboris=Math.max(...arrconcat_laboris);


export interface FilterMenuState {
    minEdge: Array<number>;
    maxEdge: Array<number>;
    minThreshold: Array<number>;
    maxThreshold: Array<number>;
    valueName: Array<'voluptate' | 'aliquip' | 'consectetur' | 'laboris'>; // doubt whether we want this...
    patients:Array<Patient>,
  }

  const initialState: FilterMenuState = {
    minEdge: [0,0,0,0],
    maxEdge: [maxEdge_voluptate,maxEdge_aliquip,maxEdge_consectetur,maxEdge_laboris],
    minThreshold: [0,0,0,0],
    maxThreshold: [maxEdge_voluptate,maxEdge_aliquip,maxEdge_consectetur,maxEdge_laboris],
    valueName: ['voluptate','aliquip','consectetur','laboris'],
    patients : patients,
  };

  /* verify according to stringVer what is the valueName of medical test and identify index in arrays of values **/
  const returnIndexValName = (stringVer:string, arrVer:Array<string>) => {
    let indexThresh = -1;
    switch (stringVer){
      case 'voluptate':
        indexThresh = arrVer.indexOf('voluptate');
        break;
      case 'aliquip':
        indexThresh = arrVer.indexOf('aliquip');
        break;
      case 'consectetur':
        indexThresh = arrVer.indexOf('consectetur');
        break;
      case 'laboris':
        indexThresh = arrVer.indexOf('laboris');
        break;
    }
    return indexThresh;
  }

  export interface MenuSlice {
    valueName:string,
    value:number
  }  

  export const filterMenuSlice = createSlice({
    name: 'filterMenu',
    initialState,
    reducers: {
      incrementByAmountMenu: (state, action: PayloadAction<MenuSlice>) => {
        let indexThresh = returnIndexValName(action.payload.valueName, state.valueName);
        if (indexThresh !== -1){
          state.minThreshold[indexThresh] += action.payload.value;
        }
      },
      changeMaxEdgeMenu: (state, action: PayloadAction<MenuSlice>) => {
        let indexThresh = returnIndexValName(action.payload.valueName, state.valueName);
        if (indexThresh !== -1){
          state.maxEdge[indexThresh] = action.payload.value;
        }
      },
      changeMinEdgeMenu: (state, action: PayloadAction<MenuSlice>) => {
        let indexThresh = returnIndexValName(action.payload.valueName, state.valueName);
        if (indexThresh !== -1){
          state.minEdge[indexThresh] = action.payload.value;
        }
      },
      changeMaxThresholdMenu: (state, action: PayloadAction<MenuSlice>) => {
        let indexThresh = returnIndexValName(action.payload.valueName, state.valueName);
        if (indexThresh !== -1){
          state.maxThreshold[indexThresh] = action.payload.value;
        }
      },
      changeMinThresholdMenu: (state, action: PayloadAction<MenuSlice>) => {
        let indexThresh = returnIndexValName(action.payload.valueName, state.valueName);
        if (indexThresh !== -1){
          state.minThreshold[indexThresh] = action.payload.value;
        }
      },
      modifyBasedInterface:(state, action: PayloadAction<MenuSlice>) => {

      }
    },
  });
    
  export const { 
    incrementByAmountMenu, 
    changeMaxEdgeMenu, changeMinEdgeMenu, changeMaxThresholdMenu, changeMinThresholdMenu 
  } = filterMenuSlice.actions;
    
  export const selectFilterMenu = (state: RootState) => state.filterMenu;
  
  export default filterMenuSlice.reducer;
  
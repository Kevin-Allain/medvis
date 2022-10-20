import { createAsyncThunk, createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SelectionState {}

const initialState: SelectionState = {}

export const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      stuff:(state) => { console.log("stuff") } // , action: PayloadAction<void>
    },
  });
    
  export const { stuff } = selectionSlice.actions;
  
  export const selectSelection = (state: RootState) => state.selection;

  export default selectionSlice.reducer;
  
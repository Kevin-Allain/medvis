import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

/** Note that a DoubleSlider is defined by its edges, i.e. maximum and minum potential values, and thresholds, i.e. filters to apply over data presented */
export interface DoubleSliderState {
  minEdge: number;
  maxEdge: number;
  minThreshold: number;
  maxThreshold: number;
  status: 'idle' | 'loading' | 'failed';
  valueName: 'voluptate' | 'aliquip' | 'consectetur' | 'laboris';
}

const initialState: DoubleSliderState = {
  minEdge: 0,
  maxEdge: 1000,
  minThreshold: 0,
  maxThreshold: 1000,
  status: 'idle',
  valueName: 'voluptate'
};

export const doubleSliderSlice = createSlice({
  name: 'doubleSlider',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes
      // state.attrName = state.attrName.substr(0, state.attrName.indexOf('-') + 1) + (parseInt(state.attrName.substr(state.attrName.indexOf('-' + 1))) + 1);
      state.maxEdge += 1;
    },
    decrement: (state) => {
      // state.attrName = state.attrName.substr(0, state.attrName.indexOf('-') + 1) + (parseInt(state.attrName.substr(state.attrName.indexOf('-' + 1))) - 1);
      state.maxEdge -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.attrName = state.attrName.substr(0, state.attrName.indexOf('-') + 1) + (parseInt(state.attrName.substr(state.attrName.indexOf('-' + 1))) + action.payload);
      state.maxEdge += action.payload;
    },
    // randomize: (state, action: PayloadAction<void>) => { state.attrName = state.attrName.substr(0, state.attrName.indexOf('-') + 1) + Math.round(1000 * Math.random()); },
    changeMaxEdge: (state, action: PayloadAction<number>) => {
      state.maxEdge = Math.max(state.minEdge,action.payload);
    },
    changeMinEdge: (state, action: PayloadAction<number>) => {
      state.minEdge = Math.min(state.maxEdge,action.payload);
    },
    changeMaxThreshold: (state, action: PayloadAction<number>) => {
      state.maxThreshold = action.payload;
    },
    changeMinThreshold: (state, action: PayloadAction<number>) => {
      state.minThreshold = action.payload;
    },
    setValueName: (state, action: PayloadAction<string>) => {
      state.valueName = (action.payload==="a")?'voluptate':(action.payload==="b")?'aliquip':(action.payload==="c")?'consectetur':'laboris';
    }
  },
  // // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => { builder .addCase(incrementAsync.pending, (state) => { state.status = 'loading'; }) .addCase(incrementAsync.fulfilled, (state, action) => { state.status = 'idle'; state.value += action.payload; }) .addCase(incrementAsync.rejected, (state) => { state.status = 'failed'; }); },
});


export const { increment, decrement, incrementByAmount, changeMaxEdge, changeMinEdge, changeMaxThreshold, changeMinThreshold } = doubleSliderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDoubleSlider = (state: RootState) => state.doubleSlider;

export default doubleSliderSlice.reducer;

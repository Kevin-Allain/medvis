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
  reducers: {
    increment: (state) => {
      state.maxEdge += 1;
    },
    decrement: (state) => {
      state.maxEdge -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.maxEdge += action.payload;
    },
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
});


export const { increment, decrement, incrementByAmount, changeMaxEdge, changeMinEdge, changeMaxThreshold, changeMinThreshold } = doubleSliderSlice.actions;

/* The function below is called a selector and allows us to select a value from
the state. Selectors can also be defined inline where they're used instead of
in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
**/
export const selectDoubleSlider = (state: RootState) => state.doubleSlider;

export default doubleSliderSlice.reducer;

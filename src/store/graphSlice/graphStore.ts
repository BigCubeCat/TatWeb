import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {THook} from '@/engine/types.ts';

export interface GraphState {
  selectedNodeId: number;
  hooks: THook[];
}

const initialState: GraphState = {
  selectedNodeId: 0,
  hooks: [],
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<number>) => {
      state.selectedNodeId = action.payload;
    },
    setHook: (state, action: PayloadAction<{id: number, hook: THook}>) => {
      console.log(action.payload.hook);
      state.hooks[action.payload.id] = action.payload.hook;
    },
  },
});

export const {setSelected, setHook} = graphSlice.actions;
export const selectGraphSlice = (state: RootState) => state.graph;
export default graphSlice.reducer;

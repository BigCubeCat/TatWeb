import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {TEngine, THook, TRequest} from '@/engine/types.ts';
import {defaultEngine} from '@/engine/useEngine.ts';
import {updateEngine} from '@/engine/engine.ts';

export interface GraphState {
  selectedNodeId: number;
  currentStep: number;
  countSteps: number;
  engine: TEngine;
  reqs: TRequest[];
}

const initialState: GraphState = {
  selectedNodeId: -1,
  currentStep: 0,
  countSteps: 10,
  engine: defaultEngine,
  reqs: [],
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<number>) => {
      state.selectedNodeId = action.payload;
      if (!state.engine.hooks[state.selectedNodeId]) {
        state.engine.hooks[state.selectedNodeId] = {
          listenId: state.selectedNodeId, interval: 0, count: 0, output: 0, sign: '>',
        };
      }
    },
    setHook: (state, action: PayloadAction<{id: number; hook: THook}>) => {
      state.engine.hooks[action.payload.id] = action.payload.hook;
    },
    setEngine: (state, action: PayloadAction<TEngine>) => {
      state.engine = action.payload;
    },
    setHooks: (state, action: PayloadAction<THook[]>) => {
      state.engine.hooks = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload % state.countSteps;
    },
    setRequests: (state, action: PayloadAction<TRequest[]>) => {
      state.countSteps = action.payload.length;
      state.currentStep = 0;
      state.reqs = action.payload;
      // update engine history
      state.engine.history = [];
      state.reqs.forEach((req) => {
        updateEngine(state.engine, req);
      });
      console.log(state.engine, state.reqs)
    },
  },
});

export const {setSelected, setHook, setEngine, setStep, setHooks, setRequests} =
  graphSlice.actions;
export const selectGraphSlice = (state: RootState) => state.graph;
export default graphSlice.reducer;

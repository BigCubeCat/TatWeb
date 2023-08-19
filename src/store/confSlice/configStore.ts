import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@/store/store';

export interface ConfigState {
  topologyFileContent: string;
  requestsFileContent: string;
  hooksFileContent: string;
}

const initialState: ConfigState = {
  topologyFileContent: '',
  requestsFileContent: '',
  hooksFileContent: '',
};

export const connectionSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setTopoFile: (state, action: PayloadAction<string>) => {
      state.topologyFileContent = action.payload;
    },
    setReqsFile: (state, action: PayloadAction<string>) => {
      state.requestsFileContent = action.payload;
    },
    setHooksFile: (state, action: PayloadAction<string>) => {
      state.hooksFileContent = action.payload;
    },
  },
});

export const {
  setTopoFile,
  setReqsFile,
  setHooksFile,
} = connectionSlice.actions;
export const selectConfigStore = (state: RootState) => state.config;
export default connectionSlice.reducer;

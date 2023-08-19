import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import graphReducer from './graphSlice/graphStore';
import configReducer from './confSlice/configStore';

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    config: configReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

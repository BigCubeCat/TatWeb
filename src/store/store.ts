import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import graphReducer from './graphSlice/graphStore';

export const store = configureStore({
  reducer: {
    graph: graphReducer,
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
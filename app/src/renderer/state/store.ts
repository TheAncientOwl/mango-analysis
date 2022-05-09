import { configureStore } from '@reduxjs/toolkit';

import { dataManagerReducer } from './reducers';

export const store = configureStore({
  reducer: {
    dataManager: dataManagerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

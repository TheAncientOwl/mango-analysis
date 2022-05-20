import { configureStore } from '@reduxjs/toolkit';

import { appGlobalReducer } from './app-global/reducer';
import { dataManagerReducer } from './data-manager/reducer';
import { principalComponentsAnalysisReducer } from './principal-components-analysis/reducer';
import { factorAnalysisReducer } from './factor-analysis/reducer';

import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    appGlobal: appGlobalReducer,
    dataManager: dataManagerReducer,
    pca: principalComponentsAnalysisReducer,
    factorAnalysis: factorAnalysisReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

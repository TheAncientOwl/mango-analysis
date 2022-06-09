import { linearRegressionReducer } from './linear-regression/reducer';
import { factorAnalysisReducer } from './factor-analysis/reducer';
import { principalComponentsAnalysisReducer } from './principal-components-analysis/reducer';
import { dataManagerReducer } from './data-manager/reducer';
import { appGlobalReducer } from './app-global/reducer';

import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    linearRegression: linearRegressionReducer,
    factorAnalysis: factorAnalysisReducer,
    pca: principalComponentsAnalysisReducer,
    dataManager: dataManagerReducer,
    appGlobal: appGlobalReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { resetAppState } from './resetAppState';

import React from 'react';

import { PCA_Dispatcher, PrincipalComponentsAnalysisState } from './state';

interface IPrincipalComponentsAnalysisContext {
  state: PrincipalComponentsAnalysisState;
  dispatch: PCA_Dispatcher;
}

export const PCA_Context = React.createContext<Partial<IPrincipalComponentsAnalysisContext>>({});

export const PCA_ContextProvider = PCA_Context.Provider;

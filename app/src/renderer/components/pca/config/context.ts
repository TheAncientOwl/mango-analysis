import React from 'react';

import { PrincipalComponentsAnalysisState } from './state';
import { PCA_Dispatcher } from './reducer';

interface IPrincipalComponentsAnalysisContext {
  state: PrincipalComponentsAnalysisState;
  dispatch: PCA_Dispatcher;
}

export const Context = React.createContext<Partial<IPrincipalComponentsAnalysisContext>>({});

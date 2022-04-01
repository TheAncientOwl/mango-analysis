import React from 'react';
import { DataManagerDispatcher, DataManagerState } from './state';

interface IDataManagerContext {
  state: DataManagerState;
  dispatch: DataManagerDispatcher;
  fetchData: () => void;
}

export const DataManagerContext = React.createContext<Partial<IDataManagerContext>>({});

export const DataManagerContextProvider = DataManagerContext.Provider;

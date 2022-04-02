import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

import { ActionType, dataManagerStateReducer, getDefaultDataManagerState } from './state';

import { axios } from '@renderer/config';
import { Snackbar } from '@renderer/components/Snackbar';

import { DataManagerContextProvider } from './context';

import { DataManagerToolbar } from './DataManagerToolbar';
import { DataManagerDataFrame } from './DataManagerDataFrame';

export const DataManager: React.FC = () => {
  const [state, dispatch] = React.useReducer(dataManagerStateReducer, getDefaultDataManagerState());

  const fetchData = () => {
    dispatch({ type: ActionType.Loading });

    axios.get(`/data/page/${state.page}/page-size/${state.pageSize}`).then(res => {
      if ('dataframe' in res.data) dispatch({ type: ActionType.DataFetched, payload: res.data.dataframe });
      else dispatch({ type: ActionType.EndLoading });
    });
  };

  const closeFeedbackMessage = () => dispatch({ type: ActionType.CloseFeedbackMessage });

  React.useEffect(() => {
    fetchData();
  }, [state.page, state.pageSize]);

  return (
    <DataManagerContextProvider value={{ dispatch, state, fetchData }}>
      <DataManagerToolbar />

      <DataManagerDataFrame />

      <Snackbar open={state.feedbackMessageOpen} onClose={closeFeedbackMessage}>
        {state.feedbackMessage}
      </Snackbar>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={state.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </DataManagerContextProvider>
  );
};

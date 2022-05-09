import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

import { ActionType, dataManagerStateReducer, getDefaultDataManagerState } from './state';

import { axios } from '@renderer/config';
import { Snackbar } from '@renderer/components/Snackbar';

import { DataManagerContextProvider } from './context';

import { DataManagerToolbar } from './DataManagerToolbar';
import { DataManagerDataFrame } from './DataManagerDataFrame';

import { useAppDispatch, useAppSelector } from '@renderer/hooks';
import { loadDataFrame } from '@src/renderer/state/actions/DataManagerActions';

export const DataManager: React.FC = () => {
  const [state, dispatch] = React.useReducer(dataManagerStateReducer, getDefaultDataManagerState());

  const _dispatch = useAppDispatch();
  const _state = useAppSelector(appState => ({
    dataFrame: appState.dataManager.dataFrame,
  }));

  React.useEffect(() => {
    console.log(_state.dataFrame);
  }, [_state.dataFrame]);

  const fetchData = () => {
    _dispatch(loadDataFrame(state.page, state.pageSize));

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

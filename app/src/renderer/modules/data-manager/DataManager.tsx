import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@renderer/store';
import { loadDataFrame, closeFeedbackMessage } from '@renderer/store/data-manager/actions';

import { Snackbar } from '@renderer/components/Snackbar';

import { DataManagerToolbar } from './DataManagerToolbar';
import DataManagerDataFrame from './DataManagerDataFrame';

const DataManager: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.loadDataFrame(props.page, props.pageSize);
  }, [props.page, props.pageSize]);

  return (
    <>
      <DataManagerToolbar />

      <DataManagerDataFrame />

      <Snackbar open={props.feedbackMessageOpen} onClose={props.closeFeedbackMessage}>
        {props.feedbackMessage}
      </Snackbar>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={props.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  loading: state.dataManager.loading,

  dataFrame: state.dataManager.dataFrame,
  page: state.dataManager.page,
  pageSize: state.dataManager.pageSize,

  feedbackMessage: state.dataManager.feedbackMessage,
  feedbackMessageOpen: state.dataManager.feedbackMessageOpen,
});

const mapDispatch = {
  loadDataFrame,
  closeFeedbackMessage,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DataManager);
// </redux>

import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { loadDataFrame, closeFeedbackMessage } from '@store/data-manager/actions';

import { Snackbar } from '@components/Snackbar';

import { Toolbar } from './Toolbar';
import DataFrameViewer from './data-frame-viewer';
import { LoadingScreen } from '@src/renderer/components/LoadingScreen';

const DataManager: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.loadDataFrame(props.page, props.pageSize);
  }, [props.page, props.pageSize]);

  return (
    <>
      <Toolbar />

      <DataFrameViewer />

      <Snackbar open={props.feedbackMessageOpen} onClose={props.closeFeedbackMessage}>
        {props.feedbackMessage}
      </Snackbar>

      <LoadingScreen loading={props.loading} />
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

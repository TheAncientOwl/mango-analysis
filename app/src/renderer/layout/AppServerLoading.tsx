import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

import { Paper } from '@components/Paper';

import { theme } from '@config/.';
import { RenderIf } from '../components/RenderIf';

const AppServerLoading: React.FC<PropsFromRedux> = props => {
  return (
    <RenderIf condition={!props.serverUp}>
      <Paper sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: theme.zIndex.drawer + 100 }}>
        Waiting for the server to start
      </Paper>
    </RenderIf>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  serverUp: state.appGlobal.serverUp,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppServerLoading);
// </redux>

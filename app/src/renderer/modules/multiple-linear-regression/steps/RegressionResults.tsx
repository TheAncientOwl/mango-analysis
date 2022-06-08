import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

const RegressionResults: React.FC<PropsFromRedux> = props => {
  return <>RegressionResults</>;
};

// <redux>
const mapState = (state: RootState) => ({});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegressionResults);
// </redux>

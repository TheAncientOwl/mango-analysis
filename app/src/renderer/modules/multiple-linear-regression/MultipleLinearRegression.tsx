import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

const MultipleLinearRegression: React.FC<PropsFromRedux> = props => {
  return <>MultipleLinearRegression</>;
};

// <redux>
const mapState = (state: RootState) => ({});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MultipleLinearRegression);
// </redux>

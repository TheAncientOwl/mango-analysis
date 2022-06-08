import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

import { Stack } from '@mui/material';

import { TestValue } from '@components/TestValue';
import { Paper } from '@components/Paper';

const MultipleRegressionResults: React.FC<PropsFromRedux> = props => {
  return (
    <Paper sx={{ display: 'block' }}>
      <Stack direction='column' gap={1}>
        <TestValue label='Coefficient' value={props.modelResult.coeff.join(', ')} />
        <TestValue label='Intercept' value={props.modelResult.intercept} />
        <TestValue label='Equation' value={props.modelResult.equation} />
        <TestValue label='MSE' value={props.modelResult.mse} />
        <TestValue label='R-Squared' value={props.modelResult.rSquared} />
        <TestValue label='Adj-R-Squared' value={props.modelResult.rSquaredAdj} />
      </Stack>
    </Paper>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  modelResult: state.multipleLinearRegression.modelResult,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MultipleRegressionResults);
// </redux>

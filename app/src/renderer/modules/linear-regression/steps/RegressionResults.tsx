import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

import { Grid, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { Image } from '@components/Image';
import { TestValue } from '@src/renderer/components/TestValue';

const RegressionResults: React.FC<PropsFromRedux> = props => {
  return (
    <Grid container gap={2}>
      <Grid item xs={5} sm={4}>
        <Paper>
          <Image src={props.results.trainPath} alt='Train Set' />
        </Paper>
      </Grid>

      <Grid item xs={5} sm={4}>
        <Paper>
          <Image src={props.results.testPath} alt='Test Set' />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={7}>
        <Paper sx={{ display: 'block' }}>
          <Stack direction='column' gap={1}>
            <TestValue label='Coefficient' value={props.results.coeff} />
            <TestValue label='Intercept' value={props.results.intercept} />
            <TestValue label='Equation' value={props.results.equation} />
            <TestValue label='MSE' value={props.results.mse} />
            <TestValue label='R-Squared' value={props.results.rSquared} />
            <TestValue label='Adj-R-Squared' value={props.results.rSquaredAdj} />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  results: state.linearRegression.modelResult,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegressionResults);
// </redux>

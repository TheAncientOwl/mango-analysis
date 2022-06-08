import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

import { Grid, Typography, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { Image } from '@components/Image';

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
            <Typography>
              {`>>`} Coefficient: {props.results.coeff}
            </Typography>
            <Typography>
              {`>>`} Intercept: {props.results.intercept}
            </Typography>
            <Typography>
              {`>>`} Equation: {props.results.equation}
            </Typography>
            <Typography>
              {`>>`} MSE: {props.results.mse}
            </Typography>
            <Typography>
              {`>>`} R-Squared: {props.results.rSquared}
            </Typography>
            <Typography>
              {`>>`} Adj-R-Squared: {props.results.rSquaredAdj}
            </Typography>
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

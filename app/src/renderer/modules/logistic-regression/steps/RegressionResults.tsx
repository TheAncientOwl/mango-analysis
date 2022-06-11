import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

import { Grid, Stack, Typography } from '@mui/material';

import { TestValue } from '@components/TestValue';
import { Paper } from '@components/Paper';
import { Image } from '@components/Image';

const RegressionResults: React.FC<PropsFromRedux> = props => {
  return (
    <Grid container gap={2}>
      <Grid item xs={5} sm={4}>
        <Paper>
          <Image src={props.modelResult.confusionMatrix.figPath} alt='Confussion Matrix' />
        </Paper>
      </Grid>

      <Grid item xs={5} sm={4}>
        <Paper>
          <Image src={props.modelResult.rocCurvePath} alt='ROC Curve' />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ display: 'block' }}>
          <Typography mb={2}>Confusion Matrix Metrics</Typography>

          <Stack direction='column' gap={1}>
            <TestValue label='Accuracy' value={props.modelResult.confusionMatrix.metrics.accuracy} />
            <TestValue label='Precision' value={props.modelResult.confusionMatrix.metrics.precision} />
            <TestValue label='Recall' value={props.modelResult.confusionMatrix.metrics.recall} />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  modelResult: state.logisticRegression.modelResult,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegressionResults);
// </redux>

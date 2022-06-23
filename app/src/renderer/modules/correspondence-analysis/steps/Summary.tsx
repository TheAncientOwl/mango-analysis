import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { Grid, Typography } from '@mui/material';

import { Paper } from '@components/Paper';
import { BasicDataFrame } from '@components/BasicDataFrame';

const Summary: React.FC<PropsFromRedux> = props => {
  return (
    <>
      <Typography mb={2}>Total inertia: {props.totalInertia}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <Paper>
            <Typography mb={1}>Row Coordinates</Typography>
            <BasicDataFrame {...props.coords.row} />
          </Paper>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Paper>
            <Typography mb={1}>Column Coordinates</Typography>
            <BasicDataFrame {...props.coords.column} />
          </Paper>
        </Grid>

        <Grid item xs={7} sm={4}>
          <Paper>
            <Typography mb={1}>Summary</Typography>
            <BasicDataFrame {...props.summary} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  coords: {
    row: state.correspondenceAnalysis.result.rowCoordinates,
    column: state.correspondenceAnalysis.result.columnCoordinates,
  },
  summary: state.correspondenceAnalysis.result.summary,
  totalInertia: state.correspondenceAnalysis.result.totalInertia,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Summary);
// </redux>

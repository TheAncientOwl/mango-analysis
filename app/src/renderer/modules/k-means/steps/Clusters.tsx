import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { runClusters, changeClusterN } from '@store/k-means/actions';
import { IKMeansClusters } from '@store/k-means/types';

import { Collapse, Grid, Stack, Typography } from '@mui/material';

import { Paper } from '@components/Paper';
import { BasicDataFrame } from '@components/BasicDataFrame';
import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis';
import { InputWithSave } from '@components/InputWithSave';
import { RunButton } from '@components/buttons';

const Clusters: React.FC<PropsFromRedux> = props => {
  const clusters: IKMeansClusters =
    props.clusters !== undefined
      ? props.clusters
      : {
          inertia: 0,
          nIter: 0,
          clusterCenters: {
            data: [],
            columns: [],
            index: [],
          },
          clusters: {
            data: [],
            columns: [],
            index: [],
          },
        };

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' alignItems='center' gap={2} mb={2}>
          <InputWithSave
            maxWidth='7em'
            placeholder='Clusters Count'
            text={props.clustersCount}
            tooltip='Value saved'
            tooltipUnsaved='Value not saved. Click to save. (Negative values not allowed)'
            type='number'
            onSave={props.changeClusterN}
          />

          <RunButton onClick={props.runClusters}>run</RunButton>
        </Stack>
      </AnalysisStepLogic>

      <AnalysisStepResult>
        <Collapse in={props.clusters !== undefined}>
          <Typography mb={1}>Total inertia: {clusters.inertia}</Typography>
          <Typography mb={2}>Number of iterations: {clusters.nIter}</Typography>

          <Grid container gap={2}>
            <Grid item xs={12}>
              <Paper sx={{ mb: 2 }}>
                <Typography mb={1}>Centroids</Typography>
                <BasicDataFrame {...clusters.clusterCenters} />
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper sx={{ mb: 1 }}>
                <Typography mb={1}>Clusters</Typography>
                <BasicDataFrame {...clusters.clusters} fixed={0} />
              </Paper>
            </Grid>
          </Grid>
        </Collapse>
      </AnalysisStepResult>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  clusters: state.kMeans.clusters,
  clustersCount: state.kMeans.nClusters,
});

const mapDispatch = {
  runClusters,
  changeClusterN,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Clusters);
// </redux>

import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { runArbitrary, runGridSearchCV, runGridSearchCVWeights, runBagging } from '@store/knn/actions';

import { Grid } from '@mui/material';

import { Model } from './Model';
import { AnalysisStepLogic } from '@components/analysis';

const Models: React.FC<PropsFromRedux> = props => {
  return (
    <AnalysisStepLogic>
      <Grid container gap={2}>
        <Grid item xs={5}>
          <Model {...props.arbitrary} name='Arbitrary K Neighbors ' onRun={props.runArbitrary} />
        </Grid>
        <Grid item xs={5}>
          <Model {...props.grid} name='Grid Search Neighbors' onRun={props.runGridSearchCV} />
        </Grid>
        <Grid item xs={5}>
          <Model {...props.gridWeights} name='Grid Search Neighbors & Weights' onRun={props.runGridSearchCVWeights} />
        </Grid>
        <Grid item xs={5}>
          <Model {...props.bagged} name='Bagged Grid Search Neighbors' onRun={props.runBagging} />
        </Grid>
      </Grid>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  arbitrary: state.knn.arbitraryModel,
  grid: state.knn.gridModel,
  gridWeights: state.knn.gridModelWeights,
  bagged: state.knn.baggedModel,
});

const mapDispatch = {
  runArbitrary,
  runGridSearchCV,
  runGridSearchCVWeights,
  runBagging,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Models);
// </redux>

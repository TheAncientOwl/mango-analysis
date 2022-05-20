import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchBartlett, fetchKMO } from '@store/factor-analysis/actions';

import { Grid } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis-step';
import { StatisticalTest } from './StatisticalTest';

const StatisticalHypotesisTesting: React.FC<PropsFromRedux> = props => {
  return (
    <AnalysisStepLogic>
      <Grid container gap={2}>
        <Grid item xs={5}>
          <StatisticalTest title='Bartlett' tooltip='some tooltip'></StatisticalTest>
        </Grid>
        <Grid item xs={6}>
          <StatisticalTest title='KMO' tooltip='some tooltip'></StatisticalTest>
        </Grid>
      </Grid>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  kmoModel: state.factorAnalysis.kmoModel,
  bartlett: state.factorAnalysis.bartlett,
});

const mapDispatch = {
  fetchBartlett,
  fetchKMO,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(StatisticalHypotesisTesting);
// </redux>

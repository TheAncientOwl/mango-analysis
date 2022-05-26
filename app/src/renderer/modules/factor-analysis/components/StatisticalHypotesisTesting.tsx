import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchBartlett, fetchKMO, unlockNextStep, lockNextStep, jumpToStep } from '@store/factor-analysis/actions';

import { Button, Grid } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis-step';
import { StatisticalTest } from './StatisticalTest';

import { ComponentsID } from '../config/componentsID';

const StatisticalHypotesisTesting: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    if (props.bartlett.chiSquare !== undefined && props.kmoModel !== undefined)
      props.unlockNextStep(ComponentsID.StatisticalHypotesisTesting);
    else props.lockNextStep(ComponentsID.StatisticalHypotesisTesting);
  }, [props.bartlett, props.kmoModel]);

  const handleSkip = () => props.jumpToStep(ComponentsID.StatisticalHypotesisTesting + 1);

  return (
    <AnalysisStepLogic>
      <Button size='small' color='warning' onClick={handleSkip}>
        skip
      </Button>

      <Grid container gap={2} mt={1}>
        <Grid item xs={5}>
          <StatisticalTest
            onTest={props.fetchBartlett}
            title='Bartlett'
            tooltip='some tooltip'
            values={[
              { symbol: 'chi^2', value: props.bartlett.chiSquare, tooltip: 'some tooltip' },
              { symbol: 'pValue', value: props.bartlett.pValue, tooltip: 'some tooltip' },
            ]}
          />
        </Grid>
        <Grid item xs={5}>
          <StatisticalTest
            onTest={props.fetchKMO}
            title='KMO'
            tooltip='some tooltip'
            values={[{ symbol: 'kmoModel', value: props.kmoModel, tooltip: 'some tooltip' }]}
          />
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
  unlockNextStep,
  lockNextStep,
  jumpToStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(StatisticalHypotesisTesting);
// </redux>

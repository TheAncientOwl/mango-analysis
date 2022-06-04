import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchBartlett, fetchKMO, unlockNextStep, lockNextStep, jumpToStep } from '@store/factor-analysis/actions';

import { Grid } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis-step';
import { SkipButton } from '@components/buttons';
import { RenderIf } from '@components/RenderIf';

import { StatisticalTest } from './StatisticalTest';
import { StepsID } from '../steps';

const StatisticalHypotesisTesting: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    if (props.bartlett.chiSquare !== undefined && props.kmoModel !== undefined)
      props.unlockNextStep(StepsID.StatisticalHypotesisTesting);
    else props.lockNextStep(StepsID.StatisticalHypotesisTesting);
  }, [props.bartlett, props.kmoModel]);

  const handleSkip = () => props.jumpToStep(StepsID.StatisticalHypotesisTesting + 1);

  return (
    <AnalysisStepLogic>
      <RenderIf condition={!props.nextStepUnlocked}>
        <SkipButton size='small' onClick={handleSkip}>
          skip
        </SkipButton>
      </RenderIf>

      <Grid container gap={2} mt={1}>
        <Grid item xs={5}>
          <StatisticalTest
            onTest={props.fetchBartlett}
            title='Bartlett'
            tooltip='The null hypothesis of the test is that the variables are orthogonal, i.e. not correlated. The alternative hypothesis is that the variables are not orthogonal, i.e. they are correlated enough to where the correlation matrix diverges significantly from the identity matrix. If the p-value from Bartlett’s Test of Sphericity is lower than our chosen significance level (common choices are 0.10, 0.05, and 0.01), then our dataset is suitable for a data reduction technique.'
            values={[
              { symbol: 'chi^2', value: props.bartlett.chiSquare },
              { symbol: 'pValue', value: props.bartlett.pValue },
            ]}
          />
        </Grid>
        <Grid item xs={5}>
          <StatisticalTest
            onTest={props.fetchKMO}
            title='KMO'
            tooltip='The KMO test allows us to ensure that the data we have are suitable to run a Factor Analysis and therefore determine whether or not we have set out what we intended to measure. The statistic that is computed is a measure of 0 to 1. Interpreting the statistic is relatively straightforward; the closer to 1, the better.'
            values={[{ symbol: 'kmoModel', value: props.kmoModel }]}
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
  nextStepUnlocked: state.factorAnalysis.nextStepUnlocked[StepsID.StatisticalHypotesisTesting],
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

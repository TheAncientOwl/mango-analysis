import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { changeFactorsNumber, runDefaultAnalysis, jumpToStep } from '@store/factor-analysis/actions';

import { Collapse, Grid } from '@mui/material';

import { StepsID } from '../steps';

import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis';
import { Image } from '@components/Image';
import { BasicDataFrame } from '@components/BasicDataFrame';
import { Paper } from '@components/Paper';
import { RunButton, SkipButton } from '@components/buttons';
import { RenderIf } from '@components/RenderIf';

const DefaultFactorAnalysis: React.FC<PropsFromRedux> = props => {
  const handleSkip = () => props.jumpToStep(StepsID.DefaultFactorAnalysis + 1);

  return (
    <React.Fragment>
      <AnalysisStepLogic>
        <RunButton onClick={props.runDefaultAnalysis}>run default analysis</RunButton>

        <RenderIf condition={!props.nextStepUnlocked}>
          <SkipButton sx={{ ml: 1 }} onClick={handleSkip}>
            skip
          </SkipButton>
        </RenderIf>
      </AnalysisStepLogic>

      <AnalysisStepResult>
        <Collapse in={props.defaultHints.screePlotSrc !== ''}>
          <Grid container spacing={2} alignItems='flex-start' sx={{ mt: 1 }}>
            <Grid item xs={6} sm={7} md={4}>
              <Paper>
                <Image src={props.defaultHints.screePlotSrc} alt='Scree Plot' />
              </Paper>
            </Grid>
            <Grid item xs={4} sm={5} md={4}>
              <Paper sx={{ maxHeight: '480px' }}>
                <BasicDataFrame {...props.defaultHints.eigenvalues} />
              </Paper>
            </Grid>
          </Grid>
        </Collapse>
      </AnalysisStepResult>
    </React.Fragment>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  numberOfFeatures: state.factorAnalysis.features.length - 1,
  defaultHints: state.factorAnalysis.defaultHints,
  nextStepUnlocked: state.factorAnalysis.nextStepUnlocked[StepsID.DefaultFactorAnalysis],
});

const mapDispatch = {
  changeFactorsNumber,
  runDefaultAnalysis,
  jumpToStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DefaultFactorAnalysis);
// </redux>

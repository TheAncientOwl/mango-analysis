import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { changeFactorsNumber, runDefaultAnalysis, jumpToStep } from '@store/factor-analysis/actions';

import { Button, Collapse, Grid } from '@mui/material';

import { ComponentsID } from '../config/componentsID';

import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis-step';
import { AnalysisImage } from '@components/AnalysisImage';
import { BasicDataFrame } from '@components/BasicDataFrame';
import { Paper } from '@components/Paper';
import { RunButton } from '@components/buttons';

const DefaultFactorAnalysis: React.FC<PropsFromRedux> = props => {
  const handleSkip = () => props.jumpToStep(ComponentsID.DefaultFactorAnalysis + 1);

  return (
    <React.Fragment>
      <AnalysisStepLogic>
        <RunButton onClick={props.runDefaultAnalysis}>run default analysis</RunButton>

        <Button sx={{ ml: 1 }} onClick={handleSkip} size='medium' color='warning'>
          skip
        </Button>
      </AnalysisStepLogic>

      <AnalysisStepResult>
        <Collapse in={props.defaultHints.screePlotSrc !== ''}>
          <Grid container spacing={2} alignItems='flex-start' sx={{ mt: 1 }}>
            <Grid item xs={6} sm={7} md={4}>
              <Paper>
                <AnalysisImage src={props.defaultHints.screePlotSrc} alt='Scree Plot' />
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

const mapState = (state: RootState) => ({
  numberOfFeatures: state.factorAnalysis.features.length - 1,
  defaultHints: state.factorAnalysis.defaultHints,
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

import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/factor-analysis/actions';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { mapConfigToSteps } from '@components/analysis-step';

import { StepsFactorAnalysis } from './steps';

const FactorAnalysis: React.FC<PropsFromRedux> = props => {
  return (
    <>
      <Box sx={{ p: 2, pb: '15em', overflowY: 'scroll' }}>
        {mapConfigToSteps(
          StepsFactorAnalysis,
          props.nextStep,
          props.prevStep,
          props.currentStep,
          StepsFactorAnalysis.length,
          props.unlockedSteps
        )}
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={props.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  loading: state.factorAnalysis.loading,
  currentStep: state.factorAnalysis.currentStep,
  unlockedSteps: state.factorAnalysis.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FactorAnalysis);
// </redux>

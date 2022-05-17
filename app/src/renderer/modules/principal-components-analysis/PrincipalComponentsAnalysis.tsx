import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/principal-components-analysis/actions';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { mapConfigToSteps } from '@components/analysis-step';

import { StepsPCA } from './StepsPCA';
import { ScalingNotification } from '@components/ScalingNotification';

const PrincipalComponentsAnalysis: React.FC<PropsFromRedux> = props => {
  return (
    <>
      <Box sx={{ p: 2, pb: '15em', overflowY: 'scroll', position: 'relative' }}>
        <ScalingNotification scaled={props.scaledData} />
        {mapConfigToSteps(
          StepsPCA,
          props.nextStep,
          props.prevStep,
          props.currentStep,
          StepsPCA.length,
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
  scaledData: state.dataManager.scaledData,
  loading: state.pca.loading,
  currentStep: state.pca.currentStep,
  unlockedSteps: state.pca.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PrincipalComponentsAnalysis);
// </redux>

import React from 'react';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { mapConfigToSteps } from '@renderer/components/AnalysisStep';
import { useCachedStepper } from '@renderer/hooks/useCachedStepper';

import { getDefeaultStatePCA, pcaStateReducer, PCA_CacheKeys } from './state';
import { PCA_ContextProvider } from './context';
import { PCA_Steps } from './PCA.steps';

export const PrincipalComponentsAnalysis: React.FC = () => {
  const [state, dispatch] = React.useReducer(pcaStateReducer, getDefeaultStatePCA());
  const { step: currentStep, nextStep, prevStep } = useCachedStepper(PCA_CacheKeys.CurrentStep, PCA_Steps.length);

  return (
    <PCA_ContextProvider value={{ dispatch, state }}>
      <Box sx={{ p: 2, overflowY: 'scroll' }}>
        {mapConfigToSteps(PCA_Steps, nextStep, prevStep, currentStep, PCA_Steps.length, state.canStep, state, dispatch)}
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={state.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </PCA_ContextProvider>
  );
};

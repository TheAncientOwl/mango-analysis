import React from 'react';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { mapConfigToSteps } from '@renderer/components/AnalysisStep';
import { useCachedStepper } from '@renderer/hooks/useCachedStepper';

import { PCA } from './config';

export const PrincipalComponentsAnalysis: React.FC = () => {
  const [state, dispatch] = React.useReducer(PCA.reducer, PCA.getDefaultState());
  const { step: currentStep, nextStep, prevStep } = useCachedStepper(PCA.CacheKeys.CurrentStep, PCA.Steps.length);

  return (
    <PCA.ContextProvider value={{ dispatch, state }}>
      <Box sx={{ p: 2, overflowY: 'scroll' }}>
        {mapConfigToSteps(PCA.Steps, nextStep, prevStep, currentStep, PCA.Steps.length, state.canStep, state, dispatch)}
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={state.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </PCA.ContextProvider>
  );
};

import React from 'react';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { mapConfigToSteps } from '@components/analysis-step';

import { PCA } from './config';

export const PrincipalComponentsAnalysis: React.FC = () => {
  const [state, dispatch] = React.useReducer(PCA.reducer, PCA.getDefaultState());

  const nextStep = () => dispatch({ type: PCA.ActionType.NextStep });
  const prevStep = () => dispatch({ type: PCA.ActionType.PrevStep });

  return (
    <PCA.ContextProvider value={{ dispatch, state }}>
      <Box sx={{ p: 2, pb: '15em', overflowY: 'scroll' }}>
        {mapConfigToSteps(
          PCA.Steps,
          nextStep,
          prevStep,
          state.currentStep,
          PCA.Steps.length,
          state.unlockedSteps,
          state,
          dispatch
        )}
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={state.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </PCA.ContextProvider>
  );
};

import React from 'react';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { mapConfigToSteps, StepConfig } from '@renderer/components/AnalysisStep';

import { TargetAndFeaturesPicker } from './TargetAndFeaturesPicker';
import { ScaleHandler } from './ScaleHandler';
import {
  getDefeaultStatePCA,
  pcaStateReducer,
  PrincipalComponentsAnalysisState,
  PCA_Dispatcher,
  ActionType,
} from './state';
import { PCA_ContextProvider } from './context';
import { useStepper } from '@renderer/hooks';
import { axios } from '@renderer/config';
import { AnalysisImage } from '../AnalysisImage';

export const TOTAL_STEPS = 6;

const PCA_Steps: ReadonlyArray<StepConfig<PrincipalComponentsAnalysisState, PCA_Dispatcher>> = [
  {
    index: 1,
    title: 'Pick target and features',
    content: <TargetAndFeaturesPicker />,
    onNext: (state, dispatch) => {
      dispatch({ type: ActionType.Loading });
      axios
        .post('pca/set/target&features', {
          target: state.target,
          features: Array.from(state.features),
        })
        .then(() => {
          dispatch({ type: ActionType.EndLoading });
        });
    },
  },
  {
    index: 2,
    title: 'Scale data',
    content: <ScaleHandler />,
  },
  {
    index: 3,
    title: 'Plot correlation matrix',
    content: <AnalysisImage src='C:\PCA-Plot-PC1-PC2.f6897e6a-beb5-48a9-ba6b-3fc0e7d13870.jpg' alt='testing' />,
  },
  {
    index: 4,
    title: 'Pick components count',
    content: 'Pick components count',
  },
  {
    index: 5,
    title: 'Plot loadings matrix',
    content: 'Plot loadings matrix',
  },
  {
    index: 6,
    title: 'Pick target and features',
    content: 'Plot observations',
  },
];

export const PrincipalComponentsAnalysis: React.FC = () => {
  const [state, dispatch] = React.useReducer(pcaStateReducer, getDefeaultStatePCA());
  const { step: currentStep, nextStep, prevStep } = useStepper(TOTAL_STEPS);

  return (
    <PCA_ContextProvider value={{ dispatch, state }}>
      <Box sx={{ p: 2, overflowY: 'scroll' }}>
        {mapConfigToSteps(PCA_Steps, nextStep, prevStep, currentStep, TOTAL_STEPS, state.canStep, state, dispatch)}
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={state.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </PCA_ContextProvider>
  );
};

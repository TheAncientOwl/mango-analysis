import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import { AnalysisImage } from '@renderer/components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@src/renderer/components/analysis-step';

import { axios } from '@renderer/config';

import { PCA } from './config';

export const CorrelationMatrix: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  const handlePlot = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/plot/correlation-matrix').then(res => {
      dispatch({ type: PCA.ActionType.FetchedCorrelationMatrixPath, payload: res.data.imagePath });
    });
  };

  const handleSkip = () =>
    dispatch({ type: PCA.ActionType.JumpToStep, payload: PCA.ComponentIndex.CorrelationMatrix + 1 });

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <Button onClick={handlePlot} size='small' color='info'>
            Plot
          </Button>
          {state.correlationMatrixPath === '' && !state.unlockedSteps[PCA.ComponentIndex.CorrelationMatrix + 1] && (
            <Button onClick={handleSkip} size='small' color='warning'>
              Skip
            </Button>
          )}
        </Stack>
      </AnalysisStepLogic>
      <AnalysisStepResult>
        <Box sx={{ mt: 2, maxWidth: 'min(60vh,60vw)' }}>
          {state.correlationMatrixPath !== '' && (
            <AnalysisImage src={state.correlationMatrixPath} alt='Correlation Matrix' />
          )}
        </Box>
      </AnalysisStepResult>
    </>
  );
};

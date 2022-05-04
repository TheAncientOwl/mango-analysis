import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import { AnalysisImage } from '@renderer/components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@src/renderer/components/analysis-step';

import { axios } from '@renderer/config';

import { PCA } from './config';

export const LoadingsMatrix: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  const handlePlot = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/plot/loadings-matrix').then(res => {
      dispatch({ type: PCA.ActionType.FetchedLoadingsMatrixPath, payload: res.data.imagePath });
    });
  };

  const handleSkip = () =>
    dispatch({ type: PCA.ActionType.JumpToStep, payload: PCA.ComponentIndex.LoadingsMatrix + 1 });

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <Button onClick={handlePlot} variant='contained' size='small' disableElevation color='info'>
            Plot
          </Button>
          {state.loadingsMatrixPath === '' && !state.unlockedSteps[PCA.ComponentIndex.LoadingsMatrix + 1] && (
            <Button onClick={handleSkip} variant='contained' size='small' disableElevation color='warning'>
              Skip
            </Button>
          )}
        </Stack>
      </AnalysisStepLogic>
      <AnalysisStepResult>
        <Box sx={{ mt: 2, maxWidth: 'min(60vh,60vw)' }}>
          {state.loadingsMatrixPath !== '' && <AnalysisImage src={state.loadingsMatrixPath} alt='Loadings Matrix' />}
        </Box>
      </AnalysisStepResult>
    </>
  );
};

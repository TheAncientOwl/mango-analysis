import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import { AnalysisImage } from '@renderer/components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@renderer/components/AnalysisStep';

import { axios } from '@renderer/config';

import { PCA } from './config';

export const LoadingsMatrix: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  const handlePlot = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/plot/loadings-matrix').then(res => {
      const path = res.data.imagePath;

      dispatch({ type: PCA.ActionType.SetLoadingsMatrixPath, payload: path });

      dispatch({
        type: PCA.ActionType.SetUnlockedStep,
        payload: { index: PCA.ComponentIndex.LoadingsMatrix + 1, allowed: true },
      });

      dispatch({ type: PCA.ActionType.EndLoading });
    });
  };

  const handleSkip = () =>
    dispatch({ type: PCA.ActionType.JumpToStep, payload: PCA.ComponentIndex.LoadingsMatrix + 1 });

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <Button onClick={handlePlot} variant='contained' size='medium' disableElevation color='info'>
            Plot
          </Button>
          {state.loadingsMatrixPath === '' && (
            <Button onClick={handleSkip} variant='contained' size='medium' disableElevation color='warning'>
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

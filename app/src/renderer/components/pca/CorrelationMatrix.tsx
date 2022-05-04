import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import { AnalysisImage } from '@renderer/components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@renderer/components/AnalysisStep';

import { axios } from '@renderer/config';

import { PCA } from './config';

export const CorrelationMatrix: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  const allowNext = () =>
    dispatch({
      type: PCA.ActionType.ChangeCanStep,
      payload: { index: PCA.ComponentIndex.CorrelationMatrix + 1, allowed: true },
    });

  const handlePlot = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/plot/correlation-matrix').then(res => {
      const path = res.data.imagePath;

      dispatch({ type: PCA.ActionType.SetCorrelationMatrixPath, payload: path });
      allowNext();

      dispatch({ type: PCA.ActionType.EndLoading });
    });
  };

  const handleSkip = allowNext;

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <Button onClick={handlePlot} variant='contained' size='medium' disableElevation color='info'>
            Plot
          </Button>
          <Button onClick={handleSkip} variant='contained' size='medium' disableElevation color='warning'>
            Skip
          </Button>
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

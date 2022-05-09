import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import { AnalysisImage } from '@renderer/components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@renderer/components/analysis-step';

import { axios } from '@renderer/config';

import { PCA } from './config';
import { Paper } from '../Paper';

export const CorrelationMatrix: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  const handlePlot = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/plot/correlation-matrix').then(res => {
      dispatch({ type: PCA.ActionType.FetchedCorrelationMatrixPath, payload: res.data.imagePath });
    });
  };

  const handleSkip = () => {
    dispatch({ type: PCA.ActionType.JumpToStep, payload: PCA.ComponentIndex.CorrelationMatrix + 1 });

    // call onNext to fetch components count hints (even on skip)
    PCA.Steps[PCA.ComponentIndex.CorrelationMatrix - 1]?.onNext?.(state, dispatch);
  };

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
        {state.correlationMatrixPath !== '' && (
          <Paper sx={{ mt: 2, maxWidth: '38em' }}>
            <Box sx={{ mt: 2, maxWidth: '35em' }}>
              <AnalysisImage src={state.correlationMatrixPath} alt='Correlation Matrix' />
            </Box>
          </Paper>
        )}
      </AnalysisStepResult>
    </>
  );
};

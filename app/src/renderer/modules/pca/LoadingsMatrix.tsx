import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import { AnalysisImage } from '@renderer/components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@renderer/components/analysis-step';

import { axios } from '@renderer/config';

import { PCA } from './config';
import { Paper } from '../../components/Paper';

export const LoadingsMatrix: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  const handlePlot = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/plot/loadings-matrix').then(res => {
      dispatch({ type: PCA.ActionType.FetchedLoadingsMatrixPath, payload: res.data.imagePath });
    });
  };

  const handleSkip = () => {
    dispatch({ type: PCA.ActionType.JumpToStep, payload: PCA.ComponentIndex.LoadingsMatrix + 1 });
    PCA.Steps[PCA.ComponentIndex.LoadingsMatrix - 1]?.onNext?.(state, dispatch);
  };

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <Button onClick={handlePlot} size='small' color='info'>
            Plot
          </Button>
          {state.loadingsMatrixPath === '' && !state.unlockedSteps[PCA.ComponentIndex.LoadingsMatrix + 1] && (
            <Button onClick={handleSkip} size='small' color='warning'>
              Skip
            </Button>
          )}
        </Stack>
      </AnalysisStepLogic>
      <AnalysisStepResult>
        {state.loadingsMatrixPath !== '' && (
          <Paper sx={{ mt: 2, maxWidth: '38em' }}>
            <Box sx={{ mt: 2, maxWidth: '35em' }}>
              <AnalysisImage src={state.loadingsMatrixPath} alt='Loadings Matrix' />
            </Box>
          </Paper>
        )}
      </AnalysisStepResult>
    </>
  );
};

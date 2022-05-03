import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import { AnalysisImage } from '@renderer/components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@renderer/components/AnalysisStep';

import { axios } from '@renderer/config';
import { useCache } from '@renderer/hooks';

import { PCA } from './config';

export const LoadingsMatrix: React.FC = () => {
  const { dispatch } = React.useContext(PCA.Context);
  const [imagePath, setImagePath] = useCache(PCA.CacheKeys.LoadingsMatrixPath, '');

  const allowNext = () => dispatch({ type: PCA.ActionType.ChangeCanStep, payload: { index: 6, allowed: true } });

  const handlePlot = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/plot/loadings-matrix').then(res => {
      const path = res.data.imagePath;

      setImagePath(path);
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
          {imagePath !== '' && <AnalysisImage src={imagePath} alt='Loadings Matrix' />}
        </Box>
      </AnalysisStepResult>
    </>
  );
};

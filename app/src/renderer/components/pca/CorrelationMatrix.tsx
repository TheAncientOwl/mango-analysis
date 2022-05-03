import { Box, Button, Stack } from '@mui/material';
import { axios } from '@renderer/config';
import { useCache } from '@renderer/hooks';
import React from 'react';
import { AnalysisImage } from '../AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '../AnalysisStep';
import { PCA_Context } from './context';
import { ActionType, PCA_CacheKeys } from './state';

export const CorrelationMatrix: React.FC = () => {
  const { dispatch } = React.useContext(PCA_Context);
  const [imagePath, setImagePath] = useCache(PCA_CacheKeys.CorrelationMatrixPath, '');

  const allowNext = () => dispatch({ type: ActionType.ChangeCanStep, payload: { index: 4, value: true } });

  const handlePlot = () => {
    dispatch({ type: ActionType.Loading });

    axios.get('/pca/plot/correlation-matrix').then(res => {
      const path = res.data.imagePath;

      setImagePath(path);
      allowNext();

      dispatch({ type: ActionType.EndLoading });
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
          {imagePath !== '' && <AnalysisImage src={imagePath} alt='Correlation Matrix' />}
        </Box>
      </AnalysisStepResult>
    </>
  );
};

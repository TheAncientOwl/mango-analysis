import React from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { AnalysisStepLogic } from '@src/renderer/components/analysis-step';
import { axios } from '@renderer/config';

import { PCA } from './config';

export const ScaleHandler: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  React.useEffect(() => {
    dispatch({
      type: PCA.ActionType.SetUnlockedStep,
      payload: { index: PCA.ComponentIndex.ScaleHandler + 1, allowed: state.scaledData },
    });
  }, [state.scaledData]);

  React.useEffect(() => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/was-data-scaled').then(res => {
      dispatch({ type: PCA.ActionType.FetchedScaledDataState, payload: res.data.scaledData });
    });
  }, []);

  const scaleData = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.post('/pca/scale-data').then(() => {
      dispatch({ type: PCA.ActionType.FetchedScaledDataState, payload: true });
    });
  };

  const skipScaleData = () =>
    dispatch({ type: PCA.ActionType.JumpToStep, payload: PCA.ComponentIndex.ScaleHandler + 1 });

  return (
    <AnalysisStepLogic>
      {state.scaledData && <Typography>The data is scaled!</Typography>}
      {!state.scaledData && (
        <>
          <Typography>In PCA analysis the data should be scaled. </Typography>
          <Typography variant='body2' sx={{ color: 'error.main', mt: 1 }}>
            (The data is not scaled!)
          </Typography>
          <Stack direction='row' mt={2} gap={1}>
            <Button size='small' color='info' onClick={scaleData}>
              Scale data
            </Button>
            <Button size='small' color='error' onClick={skipScaleData}>
              Continue without scaling
            </Button>
          </Stack>
        </>
      )}
    </AnalysisStepLogic>
  );
};

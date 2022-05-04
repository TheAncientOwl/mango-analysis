import React from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { AnalysisStepLogic } from '@renderer/components/AnalysisStep';
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
      const isDataScaled = res.data.scaledData;

      dispatch({ type: PCA.ActionType.SetScaledData, payload: isDataScaled });

      dispatch({ type: PCA.ActionType.EndLoading });
    });
  }, []);

  const scaleData = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.post('/pca/scale-data').then(() => {
      dispatch({ type: PCA.ActionType.SetScaledData, payload: true });

      dispatch({ type: PCA.ActionType.EndLoading });
    });
  };

  const skipScaleData = () => {
    dispatch({ type: PCA.ActionType.SetScaledData, payload: true });
  };

  return (
    <AnalysisStepLogic>
      {state.scaledData && <Typography>The data was already scaled!</Typography>}
      {!state.scaledData && (
        <>
          <Typography>In PCA analysis the data should be scaled.</Typography>
          <Stack direction='row' mt={1} gap={1}>
            <Button variant='contained' size='medium' disableElevation onClick={scaleData}>
              Scale data
            </Button>
            <Button variant='contained' size='medium' disableElevation onClick={skipScaleData}>
              Continue without scaling
            </Button>
          </Stack>
        </>
      )}
    </AnalysisStepLogic>
  );
};

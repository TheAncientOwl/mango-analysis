import { Button, Stack, Typography } from '@mui/material';
import { axios } from '@renderer/config';
import React from 'react';
import { AnalysisStepLogic } from '@renderer/components/AnalysisStep';
import { PCA_Context } from './context';
import { ActionType } from './state';

export const ScaleHandler: React.FC = () => {
  const { dispatch } = React.useContext(PCA_Context);

  const [scaledData, setScaledData] = React.useState(false);

  React.useEffect(() => {
    dispatch({ type: ActionType.ChangeCanStep, payload: { index: 3, value: scaledData } });
  }, [scaledData]);

  React.useEffect(() => {
    dispatch({ type: ActionType.Loading });

    axios.get('/pca/was-data-scaled').then(res => {
      const isDataScaled = res.data.scaledData;

      if (scaledData !== isDataScaled) setScaledData(res.data.scaledData);

      dispatch({ type: ActionType.EndLoading });
    });
  }, []);

  const scaleData = () => {
    dispatch({ type: ActionType.Loading });

    axios.post('/pca/scale-data').then(() => {
      setScaledData(true);

      dispatch({ type: ActionType.EndLoading });
    });
  };

  const skipScaleData = () => {
    setScaledData(true);
  };

  return (
    <AnalysisStepLogic>
      {scaledData && <Typography>The data was already scaled!</Typography>}
      {!scaledData && (
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

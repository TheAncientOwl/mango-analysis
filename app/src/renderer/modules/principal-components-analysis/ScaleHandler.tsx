import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  unlockNextStep,
  lockNextStep,
  fetchScaledDataStatus,
  scaleData,
  jumpToStep,
} from '@store/principal-components-analysis/actions';

import { Button, Stack, Typography } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis-step';

import { ComponentIndexPCA } from './ComponentIndexPCA';

const ScaleHandler: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    const nextStepUnlocked = props.nextStepUnlocked(ComponentIndexPCA.ScaleHandler);

    if (props.scaledData && !nextStepUnlocked) props.unlockNextStep(ComponentIndexPCA.ScaleHandler);
    // else if (!props.scaledData && nextStepUnlocked) props.lockNextStep(ComponentIndexPCA.ScaleHandler);
  }, [props.scaledData]);

  React.useEffect(() => {
    props.fetchScaledDataStatus();
  }, []);

  const skipScaleData = () => props.jumpToStep(ComponentIndexPCA.ScaleHandler + 1);

  return (
    <AnalysisStepLogic>
      {props.scaledData && <Typography>The data is scaled!</Typography>}
      {!props.scaledData && (
        <>
          <Typography>In PCA analysis the data should be scaled. </Typography>
          <Typography variant='body2' sx={{ color: 'error.main', mt: 1 }}>
            (The data is not scaled!)
          </Typography>
          <Stack direction='row' mt={2} gap={1}>
            <Button size='small' color='info' onClick={props.scaleData}>
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

// <redux>
const mapState = (state: RootState) => ({
  scaledData: state.pca.scaledData,
  nextStepUnlocked: (step: number) => state.pca.nextStepUnlocked[step],
});

const mapDispatch = {
  unlockNextStep,
  lockNextStep,
  fetchScaledDataStatus,
  scaleData,
  jumpToStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ScaleHandler);
// </redux>

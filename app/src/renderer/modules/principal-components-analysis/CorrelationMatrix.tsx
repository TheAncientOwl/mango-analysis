import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchCorrelationMatrixPath, jumpToStep } from '@store/principal-components-analysis/actions';

import { Box, Button, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { AnalysisImage } from '@components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis-step';

import { StepsPCA } from './StepsPCA';
import { ComponentIndexPCA } from './ComponentIndexPCA';

const CorrelationMatrix: React.FC<PropsFromRedux> = props => {
  const handleSkip = () => {
    props.jumpToStep(ComponentIndexPCA.CorrelationMatrix + 1);

    // call onNext to fetch components count hints (even on skip)
    StepsPCA[ComponentIndexPCA.CorrelationMatrix]?.onNext?.();
  };

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <Button onClick={props.fetchCorrelationMatrixPath} size='small' color='info'>
            Plot
          </Button>
          {props.correlationMatrixPath === '' && !props.nextStepUnlocked(ComponentIndexPCA.CorrelationMatrix) && (
            <Button onClick={handleSkip} size='small' color='warning'>
              Skip
            </Button>
          )}
        </Stack>
      </AnalysisStepLogic>
      <AnalysisStepResult>
        {props.correlationMatrixPath !== '' && (
          <Paper sx={{ mt: 2, maxWidth: '38em' }}>
            <Box sx={{ mt: 2, maxWidth: '35em' }}>
              <AnalysisImage src={props.correlationMatrixPath} alt='Correlation Matrix' />
            </Box>
          </Paper>
        )}
      </AnalysisStepResult>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  correlationMatrixPath: state.pca.correlationMatrixPath,
  nextStepUnlocked: (step: number) => state.pca.nextStepUnlocked[step],
});

const mapDispatch = {
  fetchCorrelationMatrixPath,
  jumpToStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CorrelationMatrix);
// </redux>

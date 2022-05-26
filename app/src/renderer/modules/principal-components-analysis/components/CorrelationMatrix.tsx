import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchCorrelationMatrixPath, jumpToStep } from '@store/principal-components-analysis/actions';

import { Box, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { AnalysisImage } from '@components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis-step';
import { SkipButton, PlotButton } from '@components/buttons';

import { StepsPCA } from '../config/steps';
import { ComponentsID } from '../config/componentsID';

const CorrelationMatrix: React.FC<PropsFromRedux> = props => {
  const handleSkip = () => {
    props.jumpToStep(ComponentsID.CorrelationMatrix + 1);

    // call onNext to fetch components count hints (even on skip)
    StepsPCA[ComponentsID.CorrelationMatrix]?.onNext?.();
  };

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <PlotButton onClick={props.fetchCorrelationMatrixPath} size='small'>
            Plot
          </PlotButton>
          {props.correlationMatrixPath === '' && !props.nextStepUnlocked(ComponentsID.CorrelationMatrix) && (
            <SkipButton size='small' onClick={handleSkip}>
              skip
            </SkipButton>
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

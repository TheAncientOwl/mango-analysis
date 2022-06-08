import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchCorrelationMatrixPath, jumpToStep } from '@store/principal-components-analysis/actions';

import { Box, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { Image } from '@components/Image';
import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis';
import { SkipButton, PlotButton } from '@components/buttons';
import { RenderIf } from '@components/RenderIf';

import { StepsPCA, StepsID } from '.';

const CorrelationMatrix: React.FC<PropsFromRedux> = props => {
  const handleSkip = () => {
    props.jumpToStep(StepsID.CorrelationMatrix + 1);

    // call onNext to fetch components count hints (even on skip)
    StepsPCA[StepsID.CorrelationMatrix]?.onNext?.();
  };

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <PlotButton onClick={props.fetchCorrelationMatrixPath} size='small'>
            Plot
          </PlotButton>
          <RenderIf
            condition={props.correlationMatrixPath === '' && !props.nextStepUnlocked(StepsID.CorrelationMatrix)}>
            <SkipButton size='small' onClick={handleSkip}>
              skip
            </SkipButton>
          </RenderIf>
        </Stack>
      </AnalysisStepLogic>

      <AnalysisStepResult>
        <RenderIf condition={props.correlationMatrixPath !== ''}>
          <Paper sx={{ mt: 2, maxWidth: '38em' }}>
            <Box sx={{ mt: 2, maxWidth: '35em' }}>
              <Image src={props.correlationMatrixPath} alt='Correlation Matrix' />
            </Box>
          </Paper>
        </RenderIf>
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

import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchLoadingsMatrixPath, jumpToStep, exportLoadings } from '@store/principal-components-analysis/actions';

import { Box, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { Image } from '@components/Image';
import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis';
import { SkipButton, PlotButton, ExportButton } from '@components/buttons';
import { RenderIf } from '@components/RenderIf';

import { StepsPCA, StepsID } from '../steps';

const LoadingsMatrix: React.FC<PropsFromRedux> = props => {
  const handleSkip = () => {
    props.jumpToStep(StepsID.LoadingsMatrix + 1);
    StepsPCA[StepsID.LoadingsMatrix]?.onNext?.();
  };

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <PlotButton onClick={props.fetchLoadingsMatrixPath} size='small'>
            Plot
          </PlotButton>
          <RenderIf condition={props.loadingsMatrixPath === '' && !props.nextStepUnlocked(StepsID.LoadingsMatrix)}>
            <SkipButton size='small' onClick={handleSkip}>
              skip
            </SkipButton>
          </RenderIf>
          <ExportButton size='small' onClick={props.exportLoadings}>
            export loadings
          </ExportButton>
        </Stack>
      </AnalysisStepLogic>

      <AnalysisStepResult>
        <RenderIf condition={props.loadingsMatrixPath !== ''}>
          <Paper sx={{ mt: 2, maxWidth: '38em' }}>
            <Box sx={{ mt: 2, maxWidth: '35em' }}>
              <Image src={props.loadingsMatrixPath} alt='Loadings Matrix' />
            </Box>
          </Paper>
        </RenderIf>
      </AnalysisStepResult>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  loadingsMatrixPath: state.pca.loadingsMatrixPath,
  nextStepUnlocked: (step: number) => state.pca.nextStepUnlocked[step],
});

const mapDispatch = {
  fetchLoadingsMatrixPath,
  jumpToStep,
  exportLoadings,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoadingsMatrix);
// </redux>

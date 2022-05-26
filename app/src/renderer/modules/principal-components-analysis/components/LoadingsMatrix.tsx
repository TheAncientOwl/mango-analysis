import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchLoadingsMatrixPath, jumpToStep, exportLoadings } from '@store/principal-components-analysis/actions';

import { Box, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { AnalysisImage } from '@components/AnalysisImage';
import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis-step';
import { SkipButton, PlotButton, ExportButton } from '@components/buttons';

import { StepsPCA } from '../config/steps';
import { ComponentsID } from '../config/componentsID';

const LoadingsMatrix: React.FC<PropsFromRedux> = props => {
  const handleSkip = () => {
    props.jumpToStep(ComponentsID.LoadingsMatrix + 1);
    StepsPCA[ComponentsID.LoadingsMatrix]?.onNext?.();
  };

  return (
    <>
      <AnalysisStepLogic>
        <Stack direction='row' gap={1}>
          <PlotButton onClick={props.fetchLoadingsMatrixPath} size='small'>
            Plot
          </PlotButton>
          {props.loadingsMatrixPath === '' && !props.nextStepUnlocked(ComponentsID.LoadingsMatrix) && (
            <SkipButton size='small' onClick={handleSkip}>
              skip
            </SkipButton>
          )}
          <ExportButton size='small' onClick={props.exportLoadings}>
            export loadings
          </ExportButton>
        </Stack>
      </AnalysisStepLogic>

      <AnalysisStepResult>
        {props.loadingsMatrixPath !== '' && (
          <Paper sx={{ mt: 2, maxWidth: '38em' }}>
            <Box sx={{ mt: 2, maxWidth: '35em' }}>
              <AnalysisImage src={props.loadingsMatrixPath} alt='Loadings Matrix' />
            </Box>
          </Paper>
        )}
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

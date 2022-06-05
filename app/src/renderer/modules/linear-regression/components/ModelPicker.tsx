import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  fetchVariables,
  changeLabelX,
  changeLabelY,
  changeTestSize,
  changeRandomState,
  runModel,
  lockNextStep,
} from '@store/linear-regression/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack, Slider, Typography } from '@mui/material';

import { Select } from '@components/Select';
import { RunButton } from '@components/buttons';
import { AnalysisStepLogic } from '@components/analysis-step';

import { StepsID } from '../steps';

const ModelPicker: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.fetchVariables();
  }, []);

  React.useEffect(() => {
    props.lockNextStep(StepsID.ModelPicker);
  }, [props.xLabel, props.yLabel, props.testSize, props.randomState]);

  const handleLabelChangeX = React.useCallback(
    (event: SelectChangeEvent) => props.changeLabelX(event.target.value),
    [props.changeLabelX]
  );

  const handleLabelChangeY = React.useCallback(
    (event: SelectChangeEvent) => props.changeLabelY(event.target.value),
    [props.changeLabelY]
  );

  return (
    <AnalysisStepLogic>
      <Stack direction='row' alignItems='center' gap={2} mb={5}>
        <Select
          minWidth='15em'
          id='yLabel'
          label='Dependent Variable'
          value={props.yLabel}
          values={props.variables}
          onChange={handleLabelChangeY}
        />

        <Select
          minWidth='15em'
          id='xLabel'
          label='Independent Variable'
          value={props.xLabel}
          values={props.variables}
          onChange={handleLabelChangeX}
        />
      </Stack>

      <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2} mb={4} maxWidth='32em'>
        <Typography>Random State</Typography>

        <Stack direction='row' alignItems='center' gap={1}>
          0
          <Slider
            sx={{ width: '20em' }}
            size='small'
            onChange={(e, value: number) => props.changeRandomState(value)}
            value={props.randomState}
            aria-label='Random-State'
            valueLabelDisplay='on'
            min={0}
            max={100}
          />
          100
        </Stack>
      </Stack>

      <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2} mb={3} maxWidth='32em'>
        <Typography>Test Size</Typography>

        <Stack direction='row' alignItems='center' gap={1}>
          0
          <Slider
            sx={{ width: '20em' }}
            size='small'
            onChange={(e, value: number) => props.changeTestSize(value)}
            value={props.testSize}
            aria-label='Random-State'
            valueLabelDisplay='on'
            min={0}
            max={100}
          />
          100
        </Stack>
      </Stack>

      <RunButton
        disabled={props.xLabel === '' || props.yLabel === ''}
        onClick={() => props.runModel(props.xLabel, props.yLabel, props.testSize / 100, props.randomState)}>
        run model
      </RunButton>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  xLabel: state.linearRegression.xLabel,
  yLabel: state.linearRegression.yLabel,
  variables: state.linearRegression.variables,
  testSize: state.linearRegression.testSize,
  randomState: state.linearRegression.randomState,
});

const mapDispatch = {
  fetchVariables,
  changeLabelX,
  changeLabelY,
  changeTestSize,
  changeRandomState,
  runModel,
  lockNextStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModelPicker);
// </redux>

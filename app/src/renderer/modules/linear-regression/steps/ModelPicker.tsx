import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  fetchVariables,
  setDependentVariable,
  setIndependentVariables,
  setRandState,
  setTestSize,
  runModel,
  lockNextStep,
} from '@src/renderer/store/linear-regression/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis';
import { Select, AutoCompleteCheckedSelect, SelectSlider } from '@components/select';
import { RunButton } from '@components/buttons';

import { StepsID } from '.';

const ModelPicker: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.fetchVariables();
  }, []);

  React.useEffect(() => {
    props.lockNextStep(StepsID.ModelPicker);
  }, [props.independendVariables, props.dependendVariable, props.testSize, props.randomState]);

  const handleIndependentVarsChange = React.useCallback(
    (values: string[]) => props.setIndependentVariables(values),
    [props.setIndependentVariables]
  );

  const handleDependentVarChange = React.useCallback(
    (e: SelectChangeEvent) => props.setDependentVariable(e.target.value),
    [props.setDependentVariable]
  );

  return (
    <AnalysisStepLogic>
      <Stack direction='row' alignItems='center' gap={2} mb={5} maxWidth='100%'>
        <Select
          minWidth='15em'
          id='dependendVar'
          label='Dependent Variable'
          value={props.dependendVariable}
          values={props.variables}
          onChange={handleDependentVarChange}
        />

        <AutoCompleteCheckedSelect
          minWidth='min(25em, 50%)'
          id='independentVars'
          label='Independend Variables'
          checkedValues={props.independendVariables}
          possibleValues={props.variables}
          onChange={handleIndependentVarsChange}
        />
      </Stack>

      <SelectSlider
        maxWidth='32em'
        sliderWidth='20em'
        label='Random State'
        min={0}
        max={100}
        onChange={value => props.setRandState(value)}
        value={props.randomState}
        sx={{ mb: 4 }}
      />

      <SelectSlider
        maxWidth='32em'
        sliderWidth='20em'
        label='Test Size'
        min={0}
        max={100}
        onChange={value => props.setTestSize(value)}
        value={props.testSize}
        sx={{ mb: 3 }}
      />

      <RunButton
        disabled={props.independendVariables.length === 0 || props.dependendVariable === ''}
        onClick={() =>
          props.runModel(props.independendVariables, props.dependendVariable, props.testSize / 100, props.randomState)
        }>
        run model
      </RunButton>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  dependendVariable: state.linearRegression.dependentVariable,
  independendVariables: state.linearRegression.independentVariables,
  variables: state.linearRegression.variables,
  randomState: state.linearRegression.randState,
  testSize: state.linearRegression.testSize,
});

const mapDispatch = {
  fetchVariables,
  setDependentVariable,
  setIndependentVariables,
  setRandState,
  setTestSize,
  runModel,
  lockNextStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModelPicker);
// </redux>

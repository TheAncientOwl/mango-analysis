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
  setMaxIterations,
} from '@store/logistic-regression/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis';
import { Select, AutoCompleteCheckedSelect, TestSizeSelector } from '@components/select';
import { RunButton } from '@components/buttons';

import { StepsID } from '.';
import { InputWithSave } from '@components/InputWithSave';

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
      <Stack direction='row' alignItems='center' gap={2} mb={3} maxWidth='100%'>
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

      <InputWithSave
        sx={{ mb: 5 }}
        minWidth='6em'
        text={props.maxIterations}
        placeholder='Max Iterations'
        tooltip='Value Saved'
        tooltipUnsaved='Value not saved. Click to save. (Cannot set negative values)'
        onSave={(value: number) => props.setMaxIterations(+value)}
        type='number'
      />

      <TestSizeSelector
        randomState={props.randomState}
        testSize={props.testSize}
        onRandomStateChange={props.setRandState}
        onTestSizeChange={props.setTestSize}
      />

      <RunButton
        disabled={props.independendVariables.length === 0 || props.dependendVariable === ''}
        onClick={() =>
          props.runModel(
            props.independendVariables,
            props.dependendVariable,
            props.testSize / 100,
            props.randomState,
            props.maxIterations
          )
        }>
        run model
      </RunButton>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  dependendVariable: state.logisticRegression.dependentVariable,
  independendVariables: state.logisticRegression.independentVariables,
  variables: state.logisticRegression.variables,
  randomState: state.logisticRegression.randState,
  testSize: state.logisticRegression.testSize,
  maxIterations: state.logisticRegression.maxIterations,
});

const mapDispatch = {
  fetchVariables,
  setDependentVariable,
  setIndependentVariables,
  setRandState,
  setTestSize,
  runModel,
  lockNextStep,
  setMaxIterations,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModelPicker);
// </redux>

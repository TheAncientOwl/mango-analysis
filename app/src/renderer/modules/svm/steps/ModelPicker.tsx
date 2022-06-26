import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  fetchPossibleFeatures,
  changeTarget,
  changeFeatures,
  changeRandomState,
  changeTestSize,
  runModel,
  changeKernel,
  lockNextStep,
  setServerTargetFeatures,
} from '@store/svm/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis';
import { Select, AutoCompleteCheckedSelect, TestSizeSelector } from '@components/select';
import { RunButton } from '@components/buttons';

import { StepsID } from '.';
import { KernelSVM } from '@src/renderer/store/svm/types';

const ModelPicker: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.fetchPossibleFeatures();
  }, []);

  React.useEffect(() => {
    props.lockNextStep(StepsID.ModelPicker);
  }, [props.features, props.target, props.testSize, props.randomState]);

  const handleIndependentVarsChange = React.useCallback(
    (values: string[]) => props.changeFeatures(values),
    [props.changeFeatures]
  );

  const handleDependentVarChange = React.useCallback(
    (e: SelectChangeEvent) => props.changeTarget(e.target.value),
    [props.changeTarget]
  );

  const handleKernelChange = React.useCallback(
    (e: SelectChangeEvent<KernelSVM>) => props.changeKernel(e.target.value as KernelSVM),
    [props.changeKernel]
  );

  return (
    <AnalysisStepLogic>
      <Stack direction='row' alignItems='center' gap={2} mb={5} maxWidth='100%'>
        <Select
          minWidth='10em'
          id='kernel'
          label='Kernel'
          value={props.kernel}
          values={['linear', 'rbf'] as KernelSVM[]}
          onChange={handleKernelChange}
        />

        <Select
          minWidth='15em'
          id='target'
          label='Target'
          value={props.target}
          values={props.possibleTargets}
          onChange={handleDependentVarChange}
        />

        <AutoCompleteCheckedSelect
          minWidth='min(25em, 50%)'
          id='features'
          label='Features'
          checkedValues={props.features}
          possibleValues={props.possibleFeatures}
          onChange={handleIndependentVarsChange}
        />
      </Stack>

      <TestSizeSelector
        randomState={props.randomState}
        testSize={props.testSize}
        onRandomStateChange={props.changeRandomState}
        onTestSizeChange={props.changeTestSize}
      />

      <RunButton disabled={props.features.length === 0 || props.target === ''} onClick={props.runModel}>
        run model
      </RunButton>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  kernel: state.svm.kernel,
  target: state.svm.target,
  features: state.svm.features,
  possibleFeatures: state.svm.possible.features,
  possibleTargets: state.svm.possible.targets,
  randomState: state.svm.randomState,
  testSize: state.svm.testSize,
});

const mapDispatch = {
  setServerTargetFeatures,
  fetchPossibleFeatures,
  changeTarget,
  changeFeatures,
  changeRandomState,
  changeTestSize,
  runModel,
  lockNextStep,
  changeKernel,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModelPicker);
// </redux>

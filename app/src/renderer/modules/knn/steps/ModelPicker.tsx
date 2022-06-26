import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  fetchPossibleFeatures,
  changeTarget,
  changeFeatures,
  changeTestSize,
  changeRandomState,
  lockNextStep,
} from '@store/knn/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis';
import { Select, AutoCompleteCheckedSelect, TestSizeSelector } from '@components/select';

import { StepsID } from '.';

const ModelPicker: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.fetchPossibleFeatures();
  }, []);

  React.useEffect(() => {
    props.lockNextStep(StepsID.ModelPicker);
  }, [props.features, props.target, props.testSize, props.randomState]);

  const handleFeaturesChange = React.useCallback(
    (values: string[]) => props.changeFeatures(values),
    [props.changeFeatures]
  );

  const handleTargetChange = React.useCallback(
    (e: SelectChangeEvent) => props.changeTarget(e.target.value),
    [props.changeTarget]
  );

  return (
    <AnalysisStepLogic>
      <Stack direction='row' alignItems='center' gap={2} mb={5} maxWidth='100%'>
        <Select
          minWidth='15em'
          id='target'
          label='Target'
          value={props.target}
          values={props.possibleFeatures}
          onChange={handleTargetChange}
        />

        <AutoCompleteCheckedSelect
          minWidth='min(25em, 50%)'
          id='features'
          label='Features'
          checkedValues={props.features}
          possibleValues={props.possibleFeatures}
          onChange={handleFeaturesChange}
        />
      </Stack>

      <TestSizeSelector
        randomState={props.randomState}
        testSize={props.testSize}
        onRandomStateChange={props.changeRandomState}
        onTestSizeChange={props.changeTestSize}
      />
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  target: state.knn.target,
  features: state.knn.features,
  possibleFeatures: state.knn.possbileFeatures,
  randomState: state.knn.randomState,
  testSize: state.knn.testSize,
});

const mapDispatch = {
  fetchPossibleFeatures,
  changeTarget,
  changeFeatures,
  changeTestSize,
  changeRandomState,
  lockNextStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModelPicker);
// </redux>

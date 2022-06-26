import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  fetchPossibleFeatures,
  changeTarget,
  changeFeatures,
  runModel,
  lockNextStep,
  setServerTargetFeatures,
} from '@store/som/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack } from '@mui/material';

import { AnalysisStepLogic } from '@components/analysis';
import { Select, AutoCompleteCheckedSelect } from '@components/select';
import { RunButton } from '@components/buttons';

import { StepsID } from '.';

const ModelPicker: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.fetchPossibleFeatures();
  }, []);

  React.useEffect(() => {
    props.lockNextStep(StepsID.ModelPicker);
  }, [props.features, props.target]);

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
          id='dependentVar'
          label='Target'
          value={props.target}
          values={props.variables}
          onChange={handleTargetChange}
        />

        <AutoCompleteCheckedSelect
          minWidth='min(25em, 50%)'
          id='independentVars'
          label='Features'
          checkedValues={props.features}
          possibleValues={props.variables}
          onChange={handleFeaturesChange}
        />
      </Stack>

      <RunButton
        disabled={props.features.length === 0 || props.target === ''}
        onClick={() => {
          props.setServerTargetFeatures();
          props.runModel();
        }}>
        run model
      </RunButton>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  target: state.som.target,
  features: state.som.features,
  variables: state.som.possibleFeatures,
});

const mapDispatch = {
  fetchPossibleFeatures,
  changeTarget,
  changeFeatures,
  runModel,
  setServerTargetFeatures,
  lockNextStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModelPicker);
// </redux>

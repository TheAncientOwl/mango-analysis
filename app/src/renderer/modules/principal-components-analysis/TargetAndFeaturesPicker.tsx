import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  fetchPossibleTargetsAndFeatures,
  changeTarget,
  changeFeatures,
  unlockNextStep,
  lockNextStep,
} from '@store/principal-components-analysis/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack } from '@mui/material';

import { Select } from '@components/Select';
import { CheckedSelect } from '@components/CheckedSelect';
import { AnalysisStepLogic } from '@components/analysis-step';

import { ComponentIndexPCA } from './ComponentIndexPCA';

const VerticalLine = <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>;

const TargetAndFeaturesPicker: React.FC<PropsFromRedux> = props => {
  // check if the analysis can continue (target and some features are selected)
  React.useEffect(() => {
    const allowNextStep = props.target !== '' && props.features.length > 0;
    const nextStepUnlocked = props.nextStepUnlocked(ComponentIndexPCA.TargetAndFeaturesPicker);

    if (allowNextStep && !nextStepUnlocked) props.unlockNextStep(ComponentIndexPCA.TargetAndFeaturesPicker);
    else if (!allowNextStep && nextStepUnlocked) props.lockNextStep(ComponentIndexPCA.TargetAndFeaturesPicker);
  }, [props.target, props.features]);

  // fetch possible targets & features
  React.useEffect(() => {
    props.fetchPossibleTargetsAndFeatures();
  }, []);

  // handlers
  const handleTargetChange = (event: SelectChangeEvent) => props.changeTarget(event.target.value);

  const handleFeaturesChange = (event: SelectChangeEvent<string[]>) =>
    props.changeFeatures(event.target.value as string[]);

  const handleSelectAllClick = () =>
    props.changeFeatures(
      props.possibleValues.features.length === props.features.length ? [] : props.possibleValues.features
    );

  return (
    <AnalysisStepLogic>
      <Stack direction='row' gap={1}>
        <Select
          minWidth='6em'
          id='select-target'
          label='Target'
          value={props.possibleValues.targets?.length > 0 ? props.target : ''}
          values={props.possibleValues.targets}
          onChange={handleTargetChange}
        />

        {VerticalLine}

        <CheckedSelect
          minWidth='15em'
          id='select-features'
          label='Features'
          allChecked={
            props.possibleValues.features.length > 0 && props.possibleValues.features.length === props.features.length
          }
          onCheckAll={handleSelectAllClick}
          checkedValues={props.features}
          possibleValues={props.possibleValues.features}
          onChange={handleFeaturesChange}
        />
      </Stack>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  target: state.pca.target,
  features: state.pca.features,
  unlockedSteps: state.pca.nextStepUnlocked,
  possibleValues: state.pca.possible,
  nextStepUnlocked: (step: number) => state.pca.nextStepUnlocked[step],
});

const mapDispatch = {
  fetchPossibleTargetsAndFeatures,
  changeTarget,
  changeFeatures,
  unlockNextStep,
  lockNextStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TargetAndFeaturesPicker);
// </redux>

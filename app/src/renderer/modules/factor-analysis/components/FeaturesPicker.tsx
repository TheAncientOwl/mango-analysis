import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { fetchPossibleFeatures, changeFeatures, unlockNextStep, lockNextStep } from '@store/factor-analysis/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack } from '@mui/material';

import { CheckedSelect } from '@components/select';
import { AnalysisStepLogic } from '@components/analysis';

import { StepsID } from '../steps';

const FeaturesPicker: React.FC<PropsFromRedux> = props => {
  // check if the analysis can continue (some features are selected)
  React.useEffect(() => {
    const allowNextStep = props.features.length > 0;
    const nextStepUnlocked = props.nextStepUnlocked(StepsID.FeaturesPicker);

    if (allowNextStep && !nextStepUnlocked) props.unlockNextStep(StepsID.FeaturesPicker);
    else if (!allowNextStep && nextStepUnlocked) props.lockNextStep(StepsID.FeaturesPicker);
  }, [props.features]);

  // fetch possible targets & features
  React.useEffect(() => {
    if (props.possibleFeatures.length === 0) props.fetchPossibleFeatures();
  }, []);

  // handlers
  const handleFeaturesChange = (event: SelectChangeEvent<string[]>) =>
    props.changeFeatures(event.target.value as string[]);

  const handleSelectAllClick = () =>
    props.changeFeatures(props.possibleFeatures.length === props.features.length ? [] : props.possibleFeatures);

  return (
    <AnalysisStepLogic>
      <Stack direction='row' gap={1}>
        <CheckedSelect
          minWidth='15em'
          id='select-features'
          label='Features'
          allChecked={props.possibleFeatures.length > 0 && props.possibleFeatures.length === props.features.length}
          onCheckAll={handleSelectAllClick}
          checkedValues={props.features}
          possibleValues={props.possibleFeatures}
          onChange={handleFeaturesChange}
        />
      </Stack>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  features: state.factorAnalysis.features,
  possibleFeatures: state.factorAnalysis.possibleFeatures,
  unlockedSteps: state.factorAnalysis.nextStepUnlocked,
  nextStepUnlocked: (step: number) => state.factorAnalysis.nextStepUnlocked[step],
});

const mapDispatch = {
  fetchPossibleFeatures,
  changeFeatures,
  unlockNextStep,
  lockNextStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FeaturesPicker);
// </redux>

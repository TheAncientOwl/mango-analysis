import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  fetchPossibleLabelsFeatures,
  changeLabel,
  changeFeatures,
  unlockNextStep,
  lockNextStep,
  changeInit,
  changeInitN,
  changeMaxIter,
  changeClusterN,
  changeRandomState,
} from '@store/k-means/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent, Stack } from '@mui/material';

import { Select, CheckedSelect, SelectSlider } from '@components/select';

import { AnalysisStepLogic } from '@components/analysis';

import { StepsID } from '.';
import { KMeansInit } from '@store/k-means/types';
import { InputWithSave } from '@components/InputWithSave';

const VerticalLine = <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>;

const ModelPicker: React.FC<PropsFromRedux> = props => {
  // check if the analysis can continue (target and some features are selected)
  React.useEffect(() => {
    const allowNextStep = props.label !== '' && props.features.length > 0;
    const nextStepUnlocked = props.nextStepUnlocked(StepsID.ModelPicker);

    if (allowNextStep && !nextStepUnlocked) props.unlockNextStep(StepsID.ModelPicker);
    else if (!allowNextStep && nextStepUnlocked) props.lockNextStep(StepsID.ModelPicker);
  }, [props.label, props.features]);

  // fetch possible targets & features
  React.useEffect(() => {
    if (props.possibleValues.features.length === 0) props.fetchPossibleLabelsFeatures();
  }, []);

  // handlers
  const handleTargetChange = (event: SelectChangeEvent) => props.changeLabel(event.target.value);

  const handleFeaturesChange = (event: SelectChangeEvent<string[]>) =>
    props.changeFeatures(event.target.value as string[]);

  const handleSelectAllClick = () =>
    props.changeFeatures(
      props.possibleValues.features.length === props.features.length ? [] : props.possibleValues.features
    );

  const handleInitChange = (event: SelectChangeEvent) => props.changeInit(event.target.value as KMeansInit);

  return (
    <AnalysisStepLogic>
      <Stack direction='row' gap={1} mb={3}>
        <Select
          minWidth='6em'
          id='select-target'
          label='Label'
          value={props.possibleValues.labels?.length > 0 ? props.label : ''}
          values={props.possibleValues.labels}
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

      <Stack direction='row' alignItems='center' gap={2} mb={3.5}>
        <Select
          minWidth='8em'
          id='select-init'
          label='Init Method'
          value={props.init}
          values={['k-means++', 'random']}
          onChange={handleInitChange}
        />

        <InputWithSave
          text={props.nInit}
          placeholder='N Init'
          tooltip='Saved.'
          tooltipUnsaved='Value not saved. Click to Save. (Negative values not allowed)'
          type='number'
          onSave={props.changeInitN}
        />

        <InputWithSave
          text={props.maxIter}
          placeholder='Max Iterations'
          tooltip='Saved.'
          tooltipUnsaved='Value not saved. Click to Save. (Negative values not allowed)'
          type='number'
          onSave={props.changeMaxIter}
        />
      </Stack>

      <SelectSlider
        maxWidth='32em'
        sliderWidth='20em'
        label='Random State'
        min={0}
        max={100}
        value={props.randomState}
        onChange={props.changeRandomState}
      />
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  init: state.kMeans.init,
  nInit: state.kMeans.nInit,
  maxIter: state.kMeans.maxIter,
  randomState: state.kMeans.randomState,
  label: state.kMeans.label,
  features: state.kMeans.features,
  unlockedSteps: state.kMeans.nextStepUnlocked,
  possibleValues: state.kMeans.possible,
  nextStepUnlocked: (step: number) => state.kMeans.nextStepUnlocked[step],
});

const mapDispatch = {
  fetchPossibleLabelsFeatures,
  changeLabel,
  changeFeatures,
  unlockNextStep,
  lockNextStep,
  changeInit,
  changeInitN,
  changeMaxIter,
  changeClusterN,
  changeRandomState,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModelPicker);
// </redux>

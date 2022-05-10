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

import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  // eslint-disable-next-line import/named
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { AnalysisStepLogic } from '@components/analysis-step';

import { ComponentIndexPCA } from './ComponentIndexPCA';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 200,
    },
  },
};

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

  // components
  const selectTarget = (
    <FormControl sx={{ minWidth: '6em' }}>
      <InputLabel id='select-target-label'>Target</InputLabel>
      <Select
        labelId='select-target-label'
        id='select-target'
        value={props.possibleValues.targets?.length > 0 ? props.target : ''}
        label='Display Targets'
        onChange={handleTargetChange}>
        {props.possibleValues.targets.map(target => (
          <MenuItem key={target} value={target}>
            {target}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const selectFeatures = (
    <>
      <Button
        size='medium'
        startIcon={
          props.possibleValues.features.length > 0 && props.possibleValues.features.length === props.features.length ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )
        }
        onClick={handleSelectAllClick}>
        all
      </Button>

      <FormControl sx={{ minWidth: '10em' }}>
        <InputLabel id='select-features-label'>Features</InputLabel>
        <Select
          labelId='select-features-label'
          id='select-features'
          multiple
          value={Array.from(props.features)}
          label='Display Features'
          onChange={handleFeaturesChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}>
          {props.possibleValues.features.map(feature => (
            <MenuItem key={feature} value={feature}>
              <Checkbox checked={props.features.indexOf(feature) > -1} />
              <ListItemText primary={feature} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  return (
    <AnalysisStepLogic>
      <Stack direction='row' gap={1}>
        {selectTarget}

        {VerticalLine}

        {selectFeatures}
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

import React from 'react';

import { axios } from '@renderer/config';

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

import { AnalysisStepLogic } from '../analysis-step';
import { PCA } from './config';

interface PossibleValues {
  targets: string[];
  features: string[];
}

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

export const TargetAndFeaturesPicker: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  const [possibleValues, setPossibleValues] = React.useState<PossibleValues>({
    targets: [],
    features: [],
  });

  // check if the analysis can continue (target and some features are selected)
  React.useEffect(() => {
    const allowed = state.target !== '' && state.features.length > 0;

    if (state.unlockedSteps[PCA.ComponentIndex.TargetAndFeaturesPicker + 1] !== allowed)
      dispatch({
        type: PCA.ActionType.SetUnlockedStep,
        payload: {
          index: PCA.ComponentIndex.TargetAndFeaturesPicker + 1,
          allowed: allowed,
        },
      });
  }, [state.target, state.features]);

  // fetch possible targets & features
  React.useEffect(() => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.get('/pca/possible/targets&features').then(res => {
      setPossibleValues(res.data);

      dispatch({ type: PCA.ActionType.EndLoading });
    });
  }, []);

  // handlers
  const handleTargetChange = (event: SelectChangeEvent) =>
    dispatch({ type: PCA.ActionType.ChangeTarget, payload: event.target.value as string });

  const handleFeaturesChange = (event: SelectChangeEvent<string[]>) =>
    dispatch({ type: PCA.ActionType.SetFeatures, payload: event.target.value });

  const handleSelectAllClick = () =>
    dispatch({
      type: PCA.ActionType.SetFeatures,
      payload: possibleValues.features.length === state.features.length ? [] : possibleValues.features,
    });

  // components
  const selectTarget = (
    <FormControl sx={{ minWidth: '6em' }}>
      <InputLabel id='select-target-label'>Target</InputLabel>
      <Select
        labelId='select-target-label'
        id='select-target'
        value={possibleValues.targets?.length > 0 ? state.target : ''}
        label='Display Targets'
        onChange={handleTargetChange}>
        {possibleValues.targets.map(target => (
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
        variant='contained'
        size='medium'
        disableElevation
        startIcon={
          possibleValues.features.length > 0 && possibleValues.features.length === state.features.length ? (
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
          value={Array.from(state.features)}
          label='Display Features'
          onChange={handleFeaturesChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}>
          {possibleValues.features.map(feature => (
            <MenuItem key={feature} value={feature}>
              <Checkbox checked={state.features.indexOf(feature) > -1} />
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

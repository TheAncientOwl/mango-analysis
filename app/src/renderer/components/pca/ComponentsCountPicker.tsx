import React from 'react';

// eslint-disable-next-line import/named
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';

import { AnalysisStepLogic } from '@renderer/components/AnalysisStep';

import { axios } from '@renderer/config';

import { PCA } from './config';

export const ComponentsCountPicker: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch({ type: PCA.ActionType.SetSelectedComponentsCount, payload: +event.target.value });
  };

  const menuItemsDummyArray = React.useMemo(
    () => new Array(Math.max(0, state.features.length - 1)).fill(0),
    [state.features]
  );

  const runAnalysis = () => {
    dispatch({ type: PCA.ActionType.Loading });

    axios.post('/pca/analyze', { componentsCount: state.selectedComponentsCount }).then(() => {
      dispatch({ type: PCA.ActionType.ComponentsAnalysisFinished });
    });
  };

  return (
    <AnalysisStepLogic>
      <Stack direction='row' gap={1}>
        <FormControl sx={{ minWidth: '7em' }}>
          <InputLabel id='components-count-picker-label'>Components</InputLabel>
          <Select
            labelId='components-count-picker-label'
            id='components-count-picker'
            value={`${state.selectedComponentsCount}`}
            label='Components'
            onChange={handleChange}>
            {menuItemsDummyArray.map((val, index) => (
              <MenuItem key={index} value={index + 2}>
                {index + 2}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={runAnalysis} variant='contained' size='medium' disableElevation>
          Run analysis
        </Button>
      </Stack>
    </AnalysisStepLogic>
  );
};
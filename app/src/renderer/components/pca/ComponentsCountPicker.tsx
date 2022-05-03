// eslint-disable-next-line import/named
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { axios } from '@src/renderer/config';
import { useCache } from '@src/renderer/hooks';
import React from 'react';
import { AnalysisStepLogic } from '../AnalysisStep';
import { PCA_Context } from './context';
import { ActionType, PCA_CacheKeys } from './state';

export const ComponentsCountPicker: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA_Context);

  const [count, setCount] = useCache(PCA_CacheKeys.ComponentsCount, 2);

  const handleChange = (event: SelectChangeEvent) => {
    setCount(+event.target.value);
  };

  const menuItemsDummyArray = React.useMemo(() => new Array(state.features.size).fill(0), [state.features]);

  const runAnalysis = () => {
    dispatch({ type: ActionType.Loading });

    axios.post('/pca/analyze', { componentsCount: count }).then(() => {
      dispatch({ type: ActionType.ChangeCanStep, payload: { index: 5, value: true } });
      dispatch({ type: ActionType.EndLoading });
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
            value={`${count}`}
            label='Components'
            onChange={handleChange}>
            {menuItemsDummyArray.map((val, index) => (
              <MenuItem key={index} value={index}>
                {index}
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

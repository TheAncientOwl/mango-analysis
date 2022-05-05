import React from 'react';

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  // eslint-disable-next-line import/named
  SelectChangeEvent,
  Stack,
} from '@mui/material';

import { AnalysisStepLogic, AnalysisStepResult } from '@src/renderer/components/analysis-step';
import { AnalysisImage } from '@renderer/components/AnalysisImage';
import { Paper } from '@renderer/components/Paper';

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
    <React.Fragment>
      <AnalysisStepResult>
        {state.componentsCountHints.kaiserPath !== '' && (
          <Grid container>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper>
                <Box sx={{ maxWidth: '35em' }}>
                  <AnalysisImage src={state.componentsCountHints.kaiserPath} alt='Scree Plot ~ Kaiser' />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper>xs=4</Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper>xs=4</Paper>
            </Grid>
          </Grid>
        )}
      </AnalysisStepResult>

      <AnalysisStepLogic>
        <Stack mt={1} ml={1} direction='row' gap={1}>
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
          <Button onClick={runAnalysis} size='medium'>
            Run analysis
          </Button>
        </Stack>
      </AnalysisStepLogic>
    </React.Fragment>
  );
};

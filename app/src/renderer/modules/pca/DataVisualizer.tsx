import React from 'react';

// eslint-disable-next-line import/named
import { Box, Button, SelectChangeEvent, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { Select } from '@components/Select';
import { AnalysisImage } from '@components/AnalysisImage';

import { axios } from '@config/.';

import { PCA } from './config';

export interface IPlot2D {
  id: string;
  pcX: string;
  pcY: string;
  plotSrc: '';
}

export const DataVisualizer: React.FC = () => {
  const { dispatch, state } = React.useContext(PCA.Context);

  return (
    <Box>
      <Button onClick={() => dispatch({ type: PCA.ActionType.PushDefaultPlot })}>add</Button>

      {state.plots.map((plot, idx) => (
        <Paper sx={{ mt: 2, display: 'block', p: 2 }} key={plot.id}>
          <Stack direction='row' gap={2}>
            <Select
              minWidth={'15em'}
              maxWidth={'20em'}
              id='pcX'
              label='X Axis'
              value={plot.pcX}
              values={state.pcaLabels}
              onChange={(event: SelectChangeEvent) =>
                dispatch({
                  type: PCA.ActionType.ChangePlot,
                  payload: { index: idx, config: { pcX: event.target.value, pcY: plot.pcY, plotSrc: plot.plotSrc } },
                })
              }
            />

            <Select
              minWidth={'15em'}
              maxWidth={'20em'}
              id='pcY'
              label='Y Axis'
              value={plot.pcY}
              values={state.pcaLabels}
              onChange={(event: SelectChangeEvent) =>
                dispatch({
                  type: PCA.ActionType.ChangePlot,
                  payload: { index: idx, config: { pcX: plot.pcX, pcY: event.target.value, plotSrc: plot.plotSrc } },
                })
              }
            />

            <Button
              onClick={() => {
                dispatch({ type: PCA.ActionType.Loading });

                axios
                  .post('/pca/plot/2D', {
                    pcX: plot.pcX,
                    pcY: plot.pcY,
                    targets: state.targets,
                    annot: true,
                    legend: false,
                  })
                  .then(res => {
                    dispatch({
                      type: PCA.ActionType.ChangePlot,
                      payload: { index: idx, config: { pcX: plot.pcX, pcY: plot.pcY, plotSrc: res.data.imagePath } },
                    });

                    dispatch({
                      type: PCA.ActionType.EndLoading,
                    });
                  });
              }}>
              plot
            </Button>
          </Stack>

          {plot.plotSrc !== '' && (
            <Box sx={{ margin: '0 auto', mt: 2, maxWidth: '40em' }}>
              <AnalysisImage src={plot.plotSrc} alt={`Plot ${plot.pcX} - ${plot.pcY}`} />
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
};

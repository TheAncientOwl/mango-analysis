import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  pushDefaultPlot,
  changePlotAxisX,
  changePlotAxisY,
  fetchPlotSrc,
  clearPlots,
  jumpToStep,
} from '@store/principal-components-analysis/actions';

// eslint-disable-next-line import/named
import { Box, Button, SelectChangeEvent, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { Select } from '@components/Select';
import { AnalysisImage } from '@components/AnalysisImage';

export interface IPlot2D {
  id: string;
  pcX: string;
  pcY: string;
  plotSrc: string;
}

export const DataVisualizer: React.FC<PropsFromRedux> = props => {
  return (
    <Box>
      <Button onClick={props.pushDefaultPlot}>add</Button>

      {props.plots.map((plot, idx) => (
        <Paper sx={{ mt: 2, display: 'block', p: 2 }} key={plot.id}>
          <Stack direction='row' gap={2}>
            <Select
              minWidth={'15em'}
              maxWidth={'20em'}
              id='pcX'
              label='X Axis'
              value={plot.pcX}
              values={props.pcaLabels}
              onChange={(event: SelectChangeEvent) => props.changePlotAxisX(idx, event.target.value)}
            />

            <Select
              minWidth={'15em'}
              maxWidth={'20em'}
              id='pcY'
              label='Y Axis'
              value={plot.pcY}
              values={props.pcaLabels}
              onChange={(event: SelectChangeEvent) => props.changePlotAxisY(idx, event.target.value)}
            />

            <Button
              onClick={() => {
                props.fetchPlotSrc(idx, plot.pcX, plot.pcY, props.targets, true, false);
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

// <redux>
const mapState = (state: RootState) => ({
  componentsCount: state.pca.analysisComponentsCount,
  plots: state.pca.plots,
  pcaLabels: state.pca.plot.pcaLabels,
  targets: state.pca.plot.targets,
});

const mapDispatch = {
  pushDefaultPlot,
  changePlotAxisX,
  changePlotAxisY,
  fetchPlotSrc,
  clearPlots,
  jumpToStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DataVisualizer);
// </redux>

import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  changePlotAxisX,
  changePlotAxisY,
  fetchPlotSrc,
  togglePlotAnnot,
  togglePlotLegend,
  changePlotTargets,
} from '@store/principal-components-analysis/actions';

// eslint-disable-next-line import/named
import { Box, Button, SelectChangeEvent, Stack } from '@mui/material';

import { Paper } from '@components/Paper';
import { Select } from '@components/Select';
import { AnalysisImage } from '@components/AnalysisImage';
import { Checkbox } from '@components/Checkbox';

export interface IPlot2D {
  id: string;
  pcX: string;
  pcY: string;
  plotSrc: string;
  annot: boolean;
  legend: boolean;
  targets: string[];
}

interface Plot2DProps {
  plotIndex: number;
}

type Props = Plot2DProps & PropsFromRedux;

export const Plot2D: React.FC<Props> = props => {
  const plot = props.getPlot(props.plotIndex);

  return (
    <Paper sx={{ mt: 2, display: 'block', p: 2 }} key={plot.id}>
      <Stack direction='row' gap={2} alignItems='center'>
        <Select
          minWidth={'15em'}
          maxWidth={'20em'}
          id='pcX'
          label='X Axis'
          value={plot.pcX}
          values={props.pcaLabels}
          onChange={(event: SelectChangeEvent) => props.changePlotAxisX(props.plotIndex, event.target.value)}
        />

        <Select
          minWidth={'15em'}
          maxWidth={'20em'}
          id='pcY'
          label='Y Axis'
          value={plot.pcY}
          values={props.pcaLabels}
          onChange={(event: SelectChangeEvent) => props.changePlotAxisY(props.plotIndex, event.target.value)}
        />

        <Checkbox checked={plot.annot} onChange={() => props.togglePlotAnnot(props.plotIndex)} label='Annotations' />
        <Checkbox checked={plot.legend} onChange={() => props.togglePlotLegend(props.plotIndex)} label='Legend' />

        <Button
          onClick={() => {
            props.fetchPlotSrc(props.plotIndex, plot.pcX, plot.pcY, props.targets, plot.annot, plot.legend);
          }}>
          plot
        </Button>
      </Stack>

      {plot.plotSrc !== '' && (
        <Box sx={{ mt: 2, maxWidth: '40em' }}>
          <AnalysisImage src={plot.plotSrc} alt={`Plot ${plot.pcX} - ${plot.pcY}`} />
        </Box>
      )}
    </Paper>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  componentsCount: state.pca.analysisComponentsCount,
  getPlot: (index: number) => state.pca.plots[index],
  pcaLabels: state.pca.plot.pcaLabels,
  targets: state.pca.plot.targets,
});

const mapDispatch = {
  changePlotAxisX,
  changePlotAxisY,
  fetchPlotSrc,
  togglePlotAnnot,
  togglePlotLegend,
  changePlotTargets,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Plot2D);
// </redux>

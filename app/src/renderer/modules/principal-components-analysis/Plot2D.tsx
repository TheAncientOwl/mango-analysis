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
import { Box, Button, Grid, SelectChangeEvent } from '@mui/material';

import { Paper } from '@components/Paper';
import { Select } from '@components/Select';
import { AnalysisImage } from '@components/AnalysisImage';
import { Checkbox } from '@components/Checkbox';
import { CheckedSelect } from '@components/CheckedSelect';

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

  const handleCheckAllTargets = () =>
    props.changePlotTargets(props.plotIndex, props.targets.length === plot.targets.length ? [] : props.targets);

  const handleTargetsChange = (event: SelectChangeEvent<string[]>) =>
    props.changePlotTargets(props.plotIndex, event.target.value as string[]);

  return (
    <Paper sx={{ mt: 2, display: 'block', p: 2 }} key={plot.id}>
      <Grid container alignItems='center' gap={2} pt={1} sx={{ overflow: 'hidden' }}>
        <Grid item>
          <Select
            minWidth={'7em'}
            maxWidth={'20em'}
            id='pcX'
            label='X Axis'
            value={plot.pcX}
            values={props.pcaLabels}
            onChange={(event: SelectChangeEvent) => props.changePlotAxisX(props.plotIndex, event.target.value)}
          />
        </Grid>

        <Grid item>
          <Select
            minWidth={'7em'}
            maxWidth={'20em'}
            id='pcY'
            label='Y Axis'
            value={plot.pcY}
            values={props.pcaLabels}
            onChange={(event: SelectChangeEvent) => props.changePlotAxisY(props.plotIndex, event.target.value)}
          />
        </Grid>

        <Grid item>
          <Checkbox checked={plot.annot} onChange={() => props.togglePlotAnnot(props.plotIndex)} label='Annotations' />
        </Grid>
        <Grid item>
          <Checkbox checked={plot.legend} onChange={() => props.togglePlotLegend(props.plotIndex)} label='Legend' />
        </Grid>
        <Grid item>
          <CheckedSelect
            minWidth='10em'
            id='select-targets'
            label='Targets'
            allChecked={props.targets.length === plot.targets.length}
            onCheckAll={handleCheckAllTargets}
            checkedValues={plot.targets}
            possibleValues={props.targets}
            onChange={handleTargetsChange}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              props.fetchPlotSrc(props.plotIndex, plot.pcX, plot.pcY, plot.targets, plot.annot, plot.legend);
            }}>
            plot
          </Button>
        </Grid>
      </Grid>

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

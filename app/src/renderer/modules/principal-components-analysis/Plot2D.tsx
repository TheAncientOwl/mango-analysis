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
  togglePlotOpen,
  deletePlot,
  changePlotTitle,
  pushDefaultPlot,
} from '@store/principal-components-analysis/actions';

// eslint-disable-next-line import/named
import { Box, Button, Grid, SelectChangeEvent, Collapse, IconButton, Tooltip, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Paper } from '@components/Paper';
import { Select } from '@components/Select';
import { AnalysisImage } from '@components/AnalysisImage';
import { Checkbox } from '@components/Checkbox';
import { TextInputSave } from '@components/TextInputSave';

import { AutoCompleteCheckedSelect } from '@components/AutocompleteCheckedSelect';

export interface IPlot2D {
  open: boolean;
  id: string;
  pcX: string;
  pcY: string;
  plotSrc: string;
  annot: boolean;
  legend: boolean;
  targets: string[];
  title: string;
}

interface Plot2DProps {
  plotIndex: number;
}

type Props = Plot2DProps & PropsFromRedux;

const visibleIcon = <VisibilityIcon />;
const hiddenIcon = <VisibilityOffIcon />;
const deleteIcon = <DeleteIcon />;
const addIcon = <AddBoxIcon />;

const separator = <Stack mt={2} mb={2} sx={{ bgcolor: 'grey.700', p: 0.1 }}></Stack>;

export const Plot2D: React.FC<Props> = props => {
  const plot = props.getPlot(props.plotIndex);

  return (
    <Paper sx={{ mt: 2, display: 'block', p: 2 }}>
      <Stack direction='row' gap={1}>
        <Tooltip title={plot.open ? 'Hide' : 'Show'}>
          <IconButton onClick={() => props.togglePlotOpen(props.plotIndex)}>
            {plot.open ? visibleIcon : hiddenIcon}
          </IconButton>
        </Tooltip>

        <TextInputSave
          minWidth='35em'
          text={plot.title}
          placeholder='Title'
          tooltip='Save Title'
          onSave={(value: string) => props.changePlotTitle(props.plotIndex, value)}
        />

        <Box sx={{ flexGrow: 1 }}></Box>

        <Tooltip title='New plot'>
          <IconButton onClick={props.pushDefaultPlot}>{addIcon}</IconButton>
        </Tooltip>

        <Tooltip title='Delete'>
          <IconButton onClick={() => props.deletePlot(props.plotIndex)}>{deleteIcon}</IconButton>
        </Tooltip>
      </Stack>

      {separator}

      <Collapse in={plot.open}>
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
            <Checkbox
              checked={plot.annot}
              onChange={() => props.togglePlotAnnot(props.plotIndex)}
              label='Annotations'
            />
          </Grid>
          <Grid item>
            <Checkbox checked={plot.legend} onChange={() => props.togglePlotLegend(props.plotIndex)} label='Legend' />
          </Grid>
          <Grid item>
            <AutoCompleteCheckedSelect
              minWidth='10em'
              id='select-targets'
              label='Targets'
              checkedValues={plot.targets}
              allChecked={props.targets.length === plot.targets.length}
              onCheckAll={() =>
                props.changePlotTargets(
                  props.plotIndex,
                  props.targets.length === plot.targets.length ? [] : props.targets
                )
              }
              possibleValues={props.targets}
              onChange={(values: string[]) => props.changePlotTargets(props.plotIndex, values)}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={plot.pcX === '' || plot.pcY === '' || plot.targets.length === 0}
              onClick={() => {
                props.fetchPlotSrc(
                  props.plotIndex,
                  plot.title,
                  plot.pcX,
                  plot.pcY,
                  plot.targets,
                  plot.annot,
                  plot.legend
                );
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
      </Collapse>
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
  togglePlotOpen,
  deletePlot,
  changePlotTitle,
  pushDefaultPlot,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Plot2D);
// </redux>

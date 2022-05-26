import React from 'react';

// eslint-disable-next-line import/named
import { Box, Button, Grid, SelectChangeEvent, Collapse, IconButton, Stack } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Tooltip } from '@components/Tooltip';
import { CheckedButton } from '@components/buttons/CheckedButton';

import { Paper } from './Paper';
import { Select } from './Select';
import { AnalysisImage } from './AnalysisImage';
import { Checkbox } from './Checkbox';
import { TextInputSave } from './TextInputSave';
import { AutoCompleteCheckedSelect } from './AutocompleteCheckedSelect';

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

interface PlotEvents {
  onChangeAxisX: (event: SelectChangeEvent) => void;
  onChangeAxisY: (event: SelectChangeEvent) => void;
  onPlot: () => void;
  onToggleAnnot: () => void;
  onToggleLegend: () => void;
  onTargetsChange: (values: string[]) => void;
  onToggleOpen: () => void;
  onDelete: () => void;
  onTitleChange: (value: string) => void;
  onPushDefaultPlot: () => void;
}

interface Plot2DProps extends PlotEvents {
  plot: IPlot2D;

  componentsCount: number;
  pcaLabels: string[];
  targets: string[];
}

type Props = Plot2DProps;

const visibleIcon = <VisibilityIcon />;
const hiddenIcon = <VisibilityOffIcon />;
const deleteIcon = <DeleteIcon />;
const addIcon = <AddBoxIcon />;

const separator = <Stack mt={2} mb={2} sx={{ bgcolor: 'grey.700', p: 0.1 }}></Stack>;

const emptyPlot: IPlot2D = {
  open: false,
  id: '',
  pcX: '',
  pcY: '',
  plotSrc: '',
  annot: false,
  legend: false,
  targets: [],
  title: '',
};

export const Plot2D: React.FC<Props> = props => {
  const plot: IPlot2D = props.plot !== undefined ? props.plot : emptyPlot;

  const mainToolbar = (
    <Stack direction='row' gap={1}>
      <Tooltip title={plot.open ? 'Hide' : 'Show'}>
        <IconButton onClick={props.onToggleOpen} color='info'>
          {plot.open ? visibleIcon : hiddenIcon}
        </IconButton>
      </Tooltip>

      <TextInputSave
        minWidth='35em'
        text={plot.title}
        placeholder='Title'
        tooltip='Save Title'
        tooltipUnsaved='Save. (not saved)'
        onSave={props.onTitleChange}
      />

      <Box sx={{ flexGrow: 1 }}></Box>

      <Tooltip title='New plot'>
        <IconButton onClick={props.onPushDefaultPlot} color='info'>
          {addIcon}
        </IconButton>
      </Tooltip>

      <Tooltip title='Delete'>
        <IconButton onClick={props.onDelete} color='error'>
          {deleteIcon}
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const optionsToolbar = (
    <Grid container alignItems='center' gap={2} pt={1} sx={{ overflow: 'hidden' }}>
      <Grid item>
        <Select
          minWidth={'7em'}
          maxWidth={'20em'}
          id='pcX'
          label='X Axis'
          value={plot.pcX}
          values={props.pcaLabels}
          onChange={props.onChangeAxisX}
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
          onChange={props.onChangeAxisY}
        />
      </Grid>

      <Grid item>
        <Checkbox checked={plot.annot} onChange={props.onToggleAnnot} label='Annotations' />
      </Grid>

      <Grid item>
        <Checkbox checked={plot.legend} onChange={props.onToggleLegend} label='Legend' />
      </Grid>

      <Grid item>
        <CheckedButton
          checked={props.targets.length === plot.targets.length}
          onClick={() => props.onTargetsChange(props.targets.length === plot.targets.length ? [] : props.targets)}>
          all targets
        </CheckedButton>
      </Grid>

      <Grid item xs={12}>
        {props.targets.length !== plot.targets.length && (
          <AutoCompleteCheckedSelect
            minWidth='10em'
            id='select-targets'
            label='Targets'
            checkedValues={plot.targets}
            possibleValues={props.targets}
            onChange={props.onTargetsChange}
          />
        )}
      </Grid>

      <Grid item>
        <Button disabled={plot.pcX === '' || plot.pcY === '' || plot.targets.length === 0} onClick={props.onPlot}>
          plot
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Paper sx={{ mt: 2, display: 'block', p: 2 }}>
      {mainToolbar}
      {separator}

      <Collapse in={plot.open}>
        {optionsToolbar}

        {plot.plotSrc !== '' && (
          <Box sx={{ mt: 2, maxWidth: '40em' }}>
            <AnalysisImage src={plot.plotSrc} alt={`Plot ${plot.pcX} - ${plot.pcY}`} />
          </Box>
        )}
      </Collapse>
    </Paper>
  );
};

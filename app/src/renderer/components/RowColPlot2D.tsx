import React from 'react';

import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/named
import { Box, Grid, SelectChangeEvent, Collapse, IconButton, Stack } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Tooltip } from './Tooltip';
import { PlotButton } from './buttons';
import { Paper } from './Paper';
import { Select } from './select/Select';
import { Image } from './Image';
import { Checkbox } from './Checkbox';
import { InputWithSave } from './InputWithSave';
import { RenderIf } from './RenderIf';

const visibleIcon = <VisibilityIcon />;
const hiddenIcon = <VisibilityOffIcon />;
const deleteIcon = <DeleteIcon />;
const addIcon = <AddBoxIcon />;

const separator = <Stack mt={2} mb={2} sx={{ bgcolor: 'grey.700', p: 0.1 }}></Stack>;

export interface IRowColPlot2D {
  id: string;
  open: boolean;
  title: string;
  plotSrc: string;
  xComponent: number;
  yComponent: number;
  showRowLabels: boolean;
  showColLabels: boolean;
}

export const createPlot = (): IRowColPlot2D => ({
  id: uuidv4(),
  open: true,
  title: '',
  plotSrc: '',
  xComponent: 0,
  yComponent: 0,
  showRowLabels: true,
  showColLabels: true,
});

const emptyPlot = createPlot();

interface IPlotEvents {
  onChangeComponentX: (event: SelectChangeEvent) => void;
  onChangeComponentY: (event: SelectChangeEvent) => void;
  onPlot: () => void;
  onToggleRowLabels: () => void;
  onToggleColLabels: () => void;
  onToggleOpen: () => void;
  onDelete: () => void;
  onTitleChange: (value: string) => void;
  onPushDefaultPlot: () => void;
}

interface Props extends IPlotEvents {
  plot: IRowColPlot2D;

  componentsCount: number;
  disableDelete: boolean;
}

export const RowColPlot2D: React.FC<Props> = props => {
  const plot: IRowColPlot2D = props.plot !== undefined ? props.plot : emptyPlot;

  const componentsCountOptions = React.useMemo(() => {
    const options = new Array(Math.max(0, props.componentsCount)).fill(0);

    options.forEach((element, index, array) => {
      array[index] = index;
    });

    return options;
  }, [props.componentsCount]);

  const mainToolbar = (
    <Stack direction='row' gap={1}>
      <Tooltip title={plot.open ? 'Hide' : 'Show'}>
        <IconButton onClick={props.onToggleOpen} color='info'>
          {plot.open ? visibleIcon : hiddenIcon}
        </IconButton>
      </Tooltip>

      <InputWithSave
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

      <RenderIf condition={!props.disableDelete}>
        <Tooltip title='Delete'>
          <IconButton onClick={props.onDelete} color='error'>
            {deleteIcon}
          </IconButton>
        </Tooltip>
      </RenderIf>
    </Stack>
  );

  const optionsToolbar = (
    <Grid container alignItems='center' gap={2} pt={1} sx={{ overflow: 'hidden' }}>
      <Grid item>
        <Select
          minWidth={'7em'}
          maxWidth={'20em'}
          id='xLabel'
          label='X Component'
          value={plot.xComponent}
          values={componentsCountOptions}
          onChange={props.onChangeComponentX}
        />
      </Grid>

      <Grid item>
        <Select
          minWidth={'7em'}
          maxWidth={'20em'}
          id='yLabel'
          label='Y Axis'
          value={plot.yComponent}
          values={componentsCountOptions}
          onChange={props.onChangeComponentY}
        />
      </Grid>

      <Grid item>
        <Checkbox checked={plot.showRowLabels} onChange={props.onToggleRowLabels} label='Row labels' />
      </Grid>

      <Grid item>
        <Checkbox checked={plot.showColLabels} onChange={props.onToggleColLabels} label='Column labels' />
      </Grid>

      <Grid item>
        <PlotButton onClick={props.onPlot} size='small'>
          plot
        </PlotButton>
      </Grid>
    </Grid>
  );

  return (
    <Paper sx={{ mt: 2, display: 'block', p: 2 }}>
      {mainToolbar}
      {separator}

      <Collapse in={plot.open}>
        {optionsToolbar}

        <RenderIf condition={plot.plotSrc !== ''}>
          <Box sx={{ mt: 2, maxWidth: '40em' }}>
            <Image src={plot.plotSrc} alt={`Plot ${plot.xComponent} - ${plot.yComponent}`} />
          </Box>
        </RenderIf>
      </Collapse>
    </Paper>
  );
};

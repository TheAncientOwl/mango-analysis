import React from 'react';

import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/named
import { Box, Grid, SelectChangeEvent, Collapse, IconButton, Stack } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Tooltip } from '@components/Tooltip';
import { PlotButton } from '@components/buttons';
import { Paper } from '@components/Paper';
import { Select } from '@components/select/Select';
import { Image } from '@components/Image';
import { Checkbox } from '@components/Checkbox';
import { InputWithSave } from '@components/InputWithSave';
import { RenderIf } from '@components/RenderIf';

const visibleIcon = <VisibilityIcon />;
const hiddenIcon = <VisibilityOffIcon />;
const deleteIcon = <DeleteIcon />;
const addIcon = <AddBoxIcon />;

const separator = <Stack mt={2} mb={2} sx={{ bgcolor: 'grey.700', p: 0.1 }}></Stack>;

export interface IPlot2D {
  id: string;
  open: boolean;
  title: string;
  plotSrc: string;
  xFeature: string;
  yFeature: string;
  plotOriginal: boolean;
  originalSrc: string;
}

export const createPlot = (): IPlot2D => ({
  id: uuidv4(),
  open: true,
  title: '',
  plotSrc: '',
  xFeature: '',
  yFeature: '',
  plotOriginal: false,
  originalSrc: '',
});

const emptyPlot = createPlot();

interface IPlotEvents {
  onChangeFeatureX: (event: SelectChangeEvent) => void;
  onChangeFeatureY: (event: SelectChangeEvent) => void;
  onPlot: () => void;
  onToggleOriginal: () => void;
  onToggleOpen: () => void;
  onDelete: () => void;
  onTitleChange: (value: string) => void;
  onPushDefaultPlot: () => void;
}

interface Props extends IPlotEvents {
  plot: IPlot2D;

  disableDelete: boolean;
  features: string[];
}

export const Plot2D: React.FC<Props> = props => {
  const plot: IPlot2D = props.plot !== undefined ? props.plot : emptyPlot;

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
          minWidth={'8em'}
          maxWidth={'20em'}
          id='xLabel'
          label='X Feature'
          value={plot.xFeature}
          values={props.features}
          onChange={props.onChangeFeatureX}
        />
      </Grid>

      <Grid item>
        <Select
          minWidth={'8em'}
          maxWidth={'20em'}
          id='yLabel'
          label='Y Feature'
          value={plot.yFeature}
          values={props.features}
          onChange={props.onChangeFeatureY}
        />
      </Grid>

      <Grid item>
        <Checkbox checked={plot.plotOriginal} onChange={props.onToggleOriginal} label='Plot Original' />
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
            <Image src={plot.plotSrc} alt={`Plot Predictions ~ ${plot.xFeature} - ${plot.yFeature}`} />
          </Box>
        </RenderIf>

        <RenderIf condition={plot.originalSrc !== '' && plot.plotOriginal}>
          <Box sx={{ mt: 2, maxWidth: '40em' }}>
            <Image src={plot.originalSrc} alt={`Plot Original ~ ${plot.xFeature} - ${plot.yFeature}`} />
          </Box>
        </RenderIf>
      </Collapse>
    </Paper>
  );
};

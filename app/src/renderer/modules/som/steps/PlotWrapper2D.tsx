import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  changePlotAxisX,
  changePlotAxisY,
  fetchPlotSrc,
  togglePlotOriginal,
  togglePlotOpen,
  deletePlot,
  changePlotTitle,
  pushDefaultPlot,
} from '@store/som/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent } from '@mui/material';

import { IPlot2D, Plot2D } from './Plot2D';

interface WrapperProps {
  plot: IPlot2D;
  plotIndex: number;
}

type Props = WrapperProps & PropsFromRedux;

const PlotWrapper2D: React.FC<Props> = props => {
  const { plotIndex } = props;

  const handleChangeFeatureX = React.useCallback(
    (event: SelectChangeEvent) => {
      props.changePlotAxisX(plotIndex, event.target.value);
    },
    [plotIndex]
  );

  const handleChangeFeatureY = React.useCallback(
    (event: SelectChangeEvent) => {
      props.changePlotAxisY(plotIndex, event.target.value);
    },
    [plotIndex]
  );

  const handlePlot = React.useCallback(() => {
    props.fetchPlotSrc(plotIndex);
  }, [plotIndex]);

  const handleToggleOriginal = React.useCallback(() => {
    props.togglePlotOriginal(plotIndex);
  }, [plotIndex]);

  const handleToggleOpen = React.useCallback(() => {
    props.togglePlotOpen(plotIndex);
  }, [plotIndex]);

  const handleDelete = React.useCallback(() => {
    props.deletePlot(plotIndex);
  }, [plotIndex]);

  const handleTitleChange = React.useCallback(
    (value: string) => {
      props.changePlotTitle(plotIndex, value);
    },
    [plotIndex]
  );

  const handlePushDefaultPlot = React.useCallback(() => {
    props.pushDefaultPlot();
  }, []);

  return (
    <Plot2D
      features={props.features}
      plot={props.plot}
      onChangeFeatureX={handleChangeFeatureX}
      onChangeFeatureY={handleChangeFeatureY}
      onPlot={handlePlot}
      onToggleOriginal={handleToggleOriginal}
      onToggleOpen={handleToggleOpen}
      onDelete={handleDelete}
      onTitleChange={handleTitleChange}
      onPushDefaultPlot={handlePushDefaultPlot}
      disableDelete={props.plotsCount === 1}
    />
  );
};

// <redux>
const mapState = (state: RootState) => ({
  plotsCount: state.som.plots.length,
  componentsCount: state.som.features.length,
  features: state.som.features,
});

const mapDispatch = {
  changePlotAxisX,
  changePlotAxisY,
  fetchPlotSrc,
  togglePlotOriginal,
  togglePlotOpen,
  deletePlot,
  changePlotTitle,
  pushDefaultPlot,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PlotWrapper2D);
// </redux>

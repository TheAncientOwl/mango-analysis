import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  changePlotComponentX,
  changePlotComponentY,
  changePlotTitle,
  togglePlotRowLabels,
  togglePlotColLabels,
  togglePlotOpen,
  fetchPlot,
  deletePlot,
  pushDefaultPlot,
} from '@store/correspondence-analysis/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent } from '@mui/material';

import { IRowColPlot2D, RowColPlot2D } from '@components/RowColPlot2D';

interface WrapperProps {
  plot: IRowColPlot2D;
  plotIndex: number;
}

type Props = WrapperProps & PropsFromRedux;

const PlotWrapper2D: React.FC<Props> = props => {
  const { plotIndex } = props;

  const handleChangeComponentX = React.useCallback(
    (event: SelectChangeEvent) => {
      props.changePlotComponentX(plotIndex, +event.target.value);
    },
    [plotIndex]
  );

  const handleChangeComponentY = React.useCallback(
    (event: SelectChangeEvent) => {
      props.changePlotComponentY(plotIndex, +event.target.value);
    },
    [plotIndex]
  );

  const handlePlot = React.useCallback(() => {
    props.fetchPlot(plotIndex);
  }, [plotIndex]);

  const handleToggleRowLabels = React.useCallback(() => {
    props.togglePlotRowLabels(plotIndex);
  }, [plotIndex]);

  const handleToggleColLabels = React.useCallback(() => {
    props.togglePlotColLabels(plotIndex);
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
    <RowColPlot2D
      plot={props.plot}
      onChangeComponentX={handleChangeComponentX}
      onChangeComponentY={handleChangeComponentY}
      onPlot={handlePlot}
      onToggleRowLabels={handleToggleRowLabels}
      onToggleColLabels={handleToggleColLabels}
      onToggleOpen={handleToggleOpen}
      onDelete={handleDelete}
      onTitleChange={handleTitleChange}
      onPushDefaultPlot={handlePushDefaultPlot}
      componentsCount={props.componentsCount}
      disableDelete={props.plotsCount === 1}
    />
  );
};

// <redux>
const mapState = (state: RootState) => ({
  componentsCount: state.correspondenceAnalysis.nComponents,
  plotsCount: state.correspondenceAnalysis.plots.length,
});

const mapDispatch = {
  changePlotComponentX,
  changePlotComponentY,
  changePlotTitle,
  togglePlotRowLabels,
  togglePlotColLabels,
  togglePlotOpen,
  fetchPlot,
  deletePlot,
  pushDefaultPlot,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PlotWrapper2D);
// </redux>

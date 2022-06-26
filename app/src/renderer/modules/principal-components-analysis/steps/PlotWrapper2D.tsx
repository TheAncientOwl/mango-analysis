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
import { SelectChangeEvent } from '@mui/material';

import { IPlot2D, Plot2D } from '@modules/principal-components-analysis/steps/Plot2D';

interface WrapperProps {
  plot: IPlot2D;
  plotIndex: number;

  pcaLabels: string[];
  targets: string[];
}

type Props = WrapperProps & PropsFromRedux;

const PlotWrapper2D: React.FC<Props> = props => {
  const { plotIndex } = props;

  const handleChangeAxisX = React.useCallback(
    (event: SelectChangeEvent) => {
      props.changePlotAxisX(plotIndex, event.target.value);
    },
    [plotIndex]
  );

  const handleChangeAxisY = React.useCallback(
    (event: SelectChangeEvent) => {
      props.changePlotAxisY(plotIndex, event.target.value);
    },
    [plotIndex]
  );

  const handlePlot = React.useCallback(() => {
    props.fetchPlotSrc(plotIndex);
  }, [plotIndex]);

  const handleToggleAnnot = React.useCallback(() => {
    props.togglePlotAnnot(plotIndex);
  }, [plotIndex]);

  const handleToggleLegend = React.useCallback(() => {
    props.togglePlotLegend(plotIndex);
  }, [plotIndex]);

  const handleTargetsChange = React.useCallback(
    (values: string[]) => {
      props.changePlotTargets(plotIndex, values);
    },
    [plotIndex]
  );

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
      plot={props.plot}
      pcaLabels={props.pcaLabels}
      targets={props.targets}
      onChangeAxisX={handleChangeAxisX}
      onChangeAxisY={handleChangeAxisY}
      onPlot={handlePlot}
      onToggleAnnot={handleToggleAnnot}
      onToggleLegend={handleToggleLegend}
      onTargetsChange={handleTargetsChange}
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
  plotsCount: state.pca.plots.length,
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

export default connector(PlotWrapper2D);
// </redux>

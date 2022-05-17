import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  jumpToStep,
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

import { Box, Button, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import PlotWrapper2D from './PlotWrapper2D';

export const DataVisualizer: React.FC<PropsFromRedux> = props => {
  return (
    <Box>
      <Button onClick={props.pushDefaultPlot}>add</Button>

      <TransitionGroup>
        {props.plots.map((plot, plotIndex) => (
          <Collapse key={plot.id}>
            <PlotWrapper2D
              plot={plot}
              plotIndex={plotIndex}
              componentsCount={props.componentsCount}
              pcaLabels={props.pcaLabels}
              targets={props.targets}
            />
          </Collapse>
        ))}
      </TransitionGroup>
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
  jumpToStep,
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

export default connector(DataVisualizer);
// </redux>

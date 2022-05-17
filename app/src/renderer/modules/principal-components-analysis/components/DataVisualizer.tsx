import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  pushDefaultPlot,
  changePlotAxisX,
  changePlotAxisY,
  fetchPlotSrc,
  jumpToStep,
} from '@store/principal-components-analysis/actions';

import { Box, Button, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import Plot2D from './Plot2D';

export const DataVisualizer: React.FC<PropsFromRedux> = props => {
  return (
    <Box>
      <Button onClick={props.pushDefaultPlot}>add</Button>

      <TransitionGroup>
        {props.plots.map((plot, idx) => (
          <Collapse key={plot.id}>
            <Plot2D plotIndex={idx} />
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
  pushDefaultPlot,
  changePlotAxisX,
  changePlotAxisY,
  fetchPlotSrc,
  jumpToStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DataVisualizer);
// </redux>

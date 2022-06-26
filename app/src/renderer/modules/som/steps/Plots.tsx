import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

import { Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import PlotWrapper2D from './PlotWrapper2D';

export const DataVisualizer: React.FC<PropsFromRedux> = props => {
  return (
    <TransitionGroup>
      {props.plots.map((plot, plotIndex) => (
        <Collapse key={plot.id}>
          <PlotWrapper2D plot={plot} plotIndex={plotIndex} />
        </Collapse>
      ))}
    </TransitionGroup>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  plots: state.som.plots,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DataVisualizer);
// </redux>

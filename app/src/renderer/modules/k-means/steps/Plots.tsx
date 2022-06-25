import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { plotSilhouette, plotElbow } from '@store/k-means/actions';

import { Grid } from '@mui/material';

import { PlotCard } from '@components/PlotCard';

const Plots: React.FC<PropsFromRedux> = props => {
  return (
    <Grid container gap={2}>
      <Grid item xs={5} sm={4}>
        <PlotCard title='Elbow Plot' src={props.elbow} alt='elbow plot' onPlot={props.plotElbow} />
      </Grid>

      <Grid item xs={5} sm={4}>
        <PlotCard title='Silhouette Plot' src={props.silhouette} alt='silhouette plot' onPlot={props.plotSilhouette} />
      </Grid>
    </Grid>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  elbow: state.kMeans.elbowSrc,
  silhouette: state.kMeans.silhouetteSrc,
});

const mapDispatch = {
  plotSilhouette,
  plotElbow,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Plots);
// </redux>

import React from 'react';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { TargetAndFeaturesPicker } from './TargetAndFeaturesPicker';
import { getDefeaultStatePCA, pcaStateReducer } from './state';
import { PCA_ContextProvider } from './context';

export const PrincipalComponentsAnalysis: React.FC = () => {
  const [state, dispatch] = React.useReducer(pcaStateReducer, getDefeaultStatePCA());

  return (
    <PCA_ContextProvider value={{ dispatch, state }}>
      <Box sx={{ p: 2 }}>
        <TargetAndFeaturesPicker />
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={state.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </PCA_ContextProvider>
  );
};

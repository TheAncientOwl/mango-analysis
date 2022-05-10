import React from 'react';

import { alpha } from '@mui/system';
import { Box } from '@mui/material';

import { theme } from '@config/.';

const overlayVisible = {
  mt: 4,
  '.analysis-step-logic > .analysis-step-logic-overlay': {
    visibility: 'visible',
  },
} as const;

const overlayHidden = {
  mt: 4,
  '.analysis-step-logic > .analysis-step-logic-overlay': {
    visibility: 'hidden',
  },
} as const;

export const getStepOverlayProps = (stepActiveNow: boolean) => (stepActiveNow ? overlayHidden : overlayVisible);

// displays logic component and
// an additional overlay on top of it if the logic is not from the current step
export const AnalysisStepLogic: React.FC = ({ children }) => {
  return (
    <Box className='analysis-step-logic' sx={{ position: 'relative' }}>
      {children}
      <Box
        className='analysis-step-logic-overlay'
        sx={{
          position: 'absolute',
          top: -15,
          left: -15,
          right: -15,
          bottom: -15,
          background: alpha(theme.palette.common.black, 0.2),
          borderRadius: theme.shape.borderRadius,
          zIndex: 20,
        }}></Box>
    </Box>
  );
};

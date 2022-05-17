import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Tooltip } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface Props {
  scaled: boolean;
}

export const ScalingNotification: React.FC<Props> = ({ scaled }) => {
  return (
    <>
      {!scaled && (
        <Box sx={{ position: 'absolute', right: 10, top: 10 }}>
          <Link to='/'>
            <Tooltip title='For better results, scale the data! Click and go to the DataManager'>
              <Box color='error.main'>
                <PriorityHighIcon sx={{ fontSize: '2.5rem', cursor: 'pointer' }} />
              </Box>
            </Tooltip>
          </Link>
        </Box>
      )}
    </>
  );
};

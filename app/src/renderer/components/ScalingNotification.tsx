import '@styles/scaling-notification-blink.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { alpha } from '@mui/system';
import { Box, IconButton } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import { Tooltip } from './Tooltip';
import { RenderIf } from './RenderIf';

import { theme } from '@config/.';

interface Props {
  scaled: boolean;
}

export const ScalingNotification: React.FC<Props> = ({ scaled }) => {
  return (
    <RenderIf condition={!scaled}>
      <Link to='/'>
        <IconButton
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,

            zIndex: theme.zIndex.tooltip,

            m: 1.5,
            pb: 0.5,
            borderRadius: theme.shape.borderRadius,
            border: '2px solid',
            borderColor: theme.palette.error.main,
            backgroundColor: alpha(theme.palette.common.black, 0.7),
            ':hover': {
              backgroundColor: alpha(theme.palette.common.black, 0.9),
            },
          }}>
          <Tooltip title='For better results, scale the data! Click and go to the DataManager'>
            <Box color='error.main' className='blink'>
              <PriorityHighIcon sx={{ fontSize: '2rem', cursor: 'pointer' }} />
            </Box>
          </Tooltip>
        </IconButton>
      </Link>
    </RenderIf>
  );
};

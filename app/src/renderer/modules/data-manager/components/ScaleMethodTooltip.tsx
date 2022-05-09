import React from 'react';
import { styled } from '@mui/material/styles';
// eslint-disable-next-line import/named
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const ScaleMethodTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 350,
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: 10,
  },
}));

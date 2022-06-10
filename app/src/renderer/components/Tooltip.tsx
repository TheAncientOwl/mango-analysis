import React from 'react';
import { styled } from '@mui/material/styles';
// eslint-disable-next-line import/named
import { default as MuiTooltip, TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 350,
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: 10,
  },
}));

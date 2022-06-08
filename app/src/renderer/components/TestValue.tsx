import React from 'react';

import { Typography } from '@mui/material';

interface Props {
  label: string;
  value: number | string;
}

export const TestValue: React.FC<Props> = ({ label, value }) => {
  return (
    <Typography>
      {'>>'} {label}: {value}
    </Typography>
  );
};

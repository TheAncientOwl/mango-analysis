import React from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

interface Props {
  loading: boolean;
  content?: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
}

const defaultContent = <CircularProgress color='inherit' />;

export const LoadingScreen: React.FC<Props> = ({ loading, content = defaultContent }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
      {content}
    </Backdrop>
  );
};

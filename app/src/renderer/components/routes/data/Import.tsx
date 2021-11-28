import React, { useContext, useState } from 'react';

import { Box, Button, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '.';
import { useForceUpdate } from '@renderer/hooks/useForceUpdate';

export const Import: React.FC = () => {
  const data = useContext(DataContext);
  const forceUpdate = useForceUpdate();

  const handleSearchClick = async () => {
    const filePath = await window.electronAPI.showOpenCsvDialog();

    if (filePath !== null) {
      data.importPath = filePath;
      forceUpdate();
    }
  };

  const handlePathDelete = () => {
    data.importPath = null;
    forceUpdate();
  };

  return (
    <Box>
      <Button
        onClick={handleSearchClick}
        sx={{ mb: 2, display: 'block' }}
        variant='contained'
        size='small'
        disableElevation>
        Search
      </Button>
      {data.importPath !== null && (
        <Box>
          <IconButton sx={{ color: 'error.main' }} onClick={handlePathDelete}>
            <DeleteIcon />
          </IconButton>
          <Chip sx={{ px: 0.7, py: 1.8 }} size='small' color='info' variant='outlined' label={data.importPath} />
        </Box>
      )}
    </Box>
  );
};

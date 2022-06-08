import React from 'react';

import { TablePagination } from '@mui/material';

interface Props {
  totalRows: number;
  pageSize: number;
  page: number;

  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

const paginationOptions = [5, 10, 25, 50, 100];

export const Pagination: React.FC<Props> = ({
  totalRows = 0,
  pageSize = 0,
  page = 0,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={paginationOptions}
      component='div'
      count={totalRows}
      rowsPerPage={pageSize}
      page={page}
      onRowsPerPageChange={event => onPageSizeChange(+event.target.value)}
      onPageChange={(event, newPage) => onPageChange(newPage)}
    />
  );
};

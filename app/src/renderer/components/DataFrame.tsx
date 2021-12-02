import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Backdrop,
} from '@mui/material';

export interface Column {
  label: string;
}

interface Obj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface DataConfig {
  columns: Column[];
  rows: Obj[];
  totalRows: number;
}

export interface DataFrameProps {
  loading: boolean;
  currentData: DataConfig;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

export const DataFrame: React.FC<DataFrameProps> = ({
  loading,
  currentData,
  currentPage,
  rowsPerPage,
  onPageChange,
  onPageSizeChange,
}) => {
  const { rows, columns, totalRows } = currentData;

  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table stickyHeader aria-label='dataframe-table'>
          <TableHead>
            <TableRow>
              {columns.length > 0 && <TableCell align='center'>ID</TableCell>}
              {columns.map((column, index) => (
                <TableCell key={index} align='center'>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} role='checkbox' tabIndex={-1}>
                <TableCell align='right'>{row.__id + 1}</TableCell>
                {columns.map((column, index) => {
                  const value = row[column.label];

                  return (
                    <TableCell key={index} align={typeof value === 'number' ? 'right' : 'left'}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[3, 10, 25, 50, 100]}
        component='div'
        count={loading || totalRows === 0 ? -1 : totalRows}
        rowsPerPage={rowsPerPage}
        page={loading ? 0 : currentPage}
        onRowsPerPageChange={event => onPageSizeChange(+event.target.value)}
        onPageChange={(event, newPage) => onPageChange(newPage)}
      />

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </React.Fragment>
  );
};

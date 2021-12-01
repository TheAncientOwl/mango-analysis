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
}

export interface DataFrameProps {
  loading: boolean;
  currentData: DataConfig;
  fullDataRowsCount: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

export const DataFrame: React.FC<DataFrameProps> = ({
  loading,
  currentData,
  fullDataRowsCount,
  currentPage,
  rowsPerPage,
  onPageChange,
  onPageSizeChange,
}) => {
  const { rows, columns } = currentData;
  console.warn(`>> DataFrame length: ${fullDataRowsCount}`);

  return (
    <Paper sx={{ height: '100%' }}>
      <TableContainer sx={{ maxHeight: '90%', minHeight: '90%' }}>
        {loading && <div>LOADING...</div>}
        <Table stickyHeader aria-label='dataframe-table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
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
        count={fullDataRowsCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onRowsPerPageChange={event => onPageSizeChange(+event.target.value)}
        onPageChange={(event, newPage) => onPageChange(newPage)}></TablePagination>
    </Paper>
  );
};

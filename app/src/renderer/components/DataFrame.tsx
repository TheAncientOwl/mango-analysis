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
  data: DataConfig;
}

export const DataFrame: React.FC<DataFrameProps> = ({ data }) => {
  const { rows, columns } = data;

  return (
    <Paper sx={{ height: '100%' }}>
      <TableContainer sx={{ maxHeight: '90%' }}>
        <Table stickyHeader aria-label='dataframe-table'>
          <TableHead>
            <TableRow>
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
                {columns.map((column, index) => {
                  const value = row[column.label];

                  return <TableCell key={index}>{value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={25}
        page={1}
        onPageChange={() => {
          console.log('page changed');
        }}
        onRowsPerPageChange={() => {
          console.log('rows per page changed');
        }}
      />
    </Paper>
  );
};

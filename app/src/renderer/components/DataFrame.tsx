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
  Typography,
} from '@mui/material';
import { alpha } from '@mui/system';

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
  console.warn(`>> DataFrame length: ${totalRows}`);

  return (
    <Paper sx={{ height: '100%', position: 'relative' }}>
      <TableContainer
        sx={{
          maxHeight: '85%',
          minHeight: '85%',
          transition: theme =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          position: 'relative',
          overflow: loading ? 'hidden' : 'auto',
        }}>
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
        count={loading || totalRows === 0 ? 1 : totalRows}
        rowsPerPage={rowsPerPage}
        page={loading ? 0 : currentPage}
        onRowsPerPageChange={event => onPageSizeChange(+event.target.value)}
        onPageChange={(event, newPage) => onPageChange(newPage)}
      />

      <Paper
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: 10,
          zIndex: 'tooltip',
          alignItems: 'center',
          display: 'flex',
          gap: 2,
          px: 1.5,
          py: 1,
          // visibility: loading ? 'visible' : 'hidden',
          transition: theme =>
            theme.transitions.create('visibility', {
              easing: theme.transitions.easing.sharp,
              duration: loading ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
            }),
          backgroundColor: theme => alpha(theme.palette.grey[900], 0.5),
        }}>
        <CircularProgress color='info' size={15} />
        <Typography variant='body2'>Loading...</Typography>
      </Paper>
    </Paper>
  );
};

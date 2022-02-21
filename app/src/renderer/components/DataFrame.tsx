import React from 'react';
import {
  Box,
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
  Checkbox,
} from '@mui/material';

export interface Column {
  __id: number;
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
  selectable?: boolean;
  onColumnSelect?: (columnHeader: string) => void;
  onRowSelect?: (rowIndex: number) => void;
  selectedColumns?: Set<string>;
  selectedRows?: Set<number>;
}

const HIGHLIGHTED_CELL = {
  bgcolor: 'primary.main',
  color: 'text.disabled',
} as const;

const preventUndefinedCall = () => {
  throw new Error('Undefined function was called');
};
export const DataFrame: React.FC<DataFrameProps> = ({
  loading,
  currentData,
  currentPage,
  rowsPerPage,
  onPageChange,
  onPageSizeChange,
  selectable = false,
  onColumnSelect = preventUndefinedCall,
  onRowSelect = preventUndefinedCall,
  selectedColumns = new Set<string>(),
  selectedRows = new Set<number>(),
}) => {
  const { rows, columns, totalRows } = currentData;

  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table stickyHeader aria-label='dataframe-table'>
          <TableHead>
            <TableRow>
              {columns.length > 0 && <TableCell align='center'>ID</TableCell>}
              {columns.map(column => {
                const isSelected = selectedColumns.has(column.label);

                return (
                  <TableCell sx={isSelected ? HIGHLIGHTED_CELL : {}} key={column.__id} align='center'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectable && (
                        <Checkbox
                          color='secondary'
                          inputProps={{ 'aria-label': 'Header checkbox' }}
                          onChange={() => onColumnSelect(column.label)}
                          checked={isSelected}
                        />
                      )}
                      {column.label}
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => {
              const isRowSelected = selectedRows.has(row.__id);

              return (
                <TableRow sx={isRowSelected ? HIGHLIGHTED_CELL : {}} key={row.__id} role='checkbox' tabIndex={-1}>
                  <TableCell align='right'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectable && (
                        <Checkbox
                          color='secondary'
                          checked={isRowSelected}
                          inputProps={{ 'aria-label': 'Row checkbox' }}
                          onChange={() => onRowSelect(row.__id)}
                        />
                      )}
                      {row.__id + 1}
                    </Box>
                  </TableCell>
                  {columns.map(column => {
                    const value = row[column.label];

                    return (
                      <TableCell
                        sx={selectedColumns.has(column.label) ? HIGHLIGHTED_CELL : {}}
                        key={`${row.__id}-${column.__id}`}
                        align={typeof value === 'number' ? 'right' : 'left'}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
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

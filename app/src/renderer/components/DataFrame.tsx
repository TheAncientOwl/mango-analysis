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
// eslint-disable-next-line import/named
import { Theme } from '@mui/material/styles';
import { logRender } from '@src/common/logRender';

export interface Data {
  labels: string[];
  totalRows: number;
  rows: (string | number)[][];
}

export type Decimals = number | 'default';

export interface DataFrameProps {
  loading: boolean;

  currentData: Data;
  currentPage: number;
  rowsPerPage: number;

  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;

  decimals?: Decimals;

  selectable?: boolean;
  onLabelSelect?: (selectedLabel: string) => void;
  onRowSelect?: (selectedRow: number) => void;
  selectedLabels?: Set<string>;
  selectedRows?: Set<number>;
}

const HIGHLIGHTED_CELL = {
  bgcolor: 'primary.main',
  color: 'text.disabled',
} as const;

const CELL_TRANSITION = {
  transition: (theme: Theme) =>
    theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
} as const;

const preventUndefinedCall = () => {
  throw new Error('Undefined function was called');
};

const _DataFrame: React.FC<DataFrameProps> = ({
  loading,
  currentData,
  currentPage,
  rowsPerPage,
  onPageChange,
  onPageSizeChange,
  selectable = false,
  onLabelSelect = preventUndefinedCall,
  onRowSelect = preventUndefinedCall,
  selectedLabels = new Set<string>(),
  selectedRows = new Set<number>(),
  decimals = 'default',
}) => {
  const { rows, labels, totalRows } = currentData;
  logRender('DataFrame');

  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table stickyHeader aria-label='dataframe-table'>
          <TableHead>
            <TableRow>
              {labels.length > 1 && <TableCell align='center'>ID</TableCell>}
              {labels.slice(1).map((label, index) => {
                const isSelected = selectedLabels.has(label);

                return (
                  <TableCell
                    sx={{ ...CELL_TRANSITION, ...(isSelected ? HIGHLIGHTED_CELL : {}) }}
                    key={`${label}_${index}`}
                    align='center'>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {selectable && (
                        <Checkbox
                          color='secondary'
                          inputProps={{ 'aria-label': 'Header checkbox' }}
                          onChange={() => onLabelSelect(label)}
                          checked={isSelected}
                        />
                      )}
                      {label}
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => {
              const rowID = row[0] as number;
              const isRowSelected = selectedRows.has(rowID);

              return (
                <TableRow
                  sx={{ ...CELL_TRANSITION, ...(isRowSelected ? HIGHLIGHTED_CELL : {}) }}
                  key={rowID}
                  role='checkbox'
                  tabIndex={-1}>
                  <TableCell align='right'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectable && (
                        <Checkbox
                          color='secondary'
                          checked={isRowSelected}
                          inputProps={{ 'aria-label': 'Row checkbox' }}
                          onChange={() => onRowSelect(rowID)}
                        />
                      )}
                      {rowID}
                    </Box>
                  </TableCell>

                  {row.slice(1).map((value, index) => {
                    const columnLabel = labels[index + 1];

                    return (
                      <TableCell
                        sx={{ ...CELL_TRANSITION, ...(selectedLabels.has(columnLabel) ? HIGHLIGHTED_CELL : {}) }}
                        key={`${rowID}-${columnLabel}`}
                        align={typeof value === 'number' ? 'right' : 'left'}>
                        {typeof value === 'number' && decimals !== 'default' ? value.toFixed(decimals) : value}
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

export const DataFrame = React.memo(_DataFrame);

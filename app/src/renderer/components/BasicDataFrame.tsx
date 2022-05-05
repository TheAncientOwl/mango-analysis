import React from 'react';

import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';

export interface BasicDataFrameProps {
  columns: string[];
  data: number[][];
  index: string[];
  maxWidth?: string;
}

export const BasicDataFrame: React.FC<BasicDataFrameProps> = ({ columns, data, index, maxWidth = 'auto' }) => {
  return (
    <TableContainer sx={{ maxWidth: maxWidth }}>
      <Table size='small' stickyHeader aria-label='basic-data-frame'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>ID</TableCell>

            {columns.map(column => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((line, idx) => (
            <TableRow key={index[idx]}>
              <TableCell align='center'>{index[idx]}</TableCell>
              {line.map((number, idx) => (
                <TableCell align='right' key={idx}>
                  {(number as number).toFixed(4)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

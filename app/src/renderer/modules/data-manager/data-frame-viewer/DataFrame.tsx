import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { CheckBox } from './CheckBox';
import { getCellStyle } from './styles';
import { DataFrameViewerProps } from './types';

const _DataFrame: React.FC<DataFrameViewerProps> = ({
  dataFrame,

  checkedLabels,
  checkedRows,
  decimalsPrecision = 'all',

  onLabelCheck,
  onRowCheck,
}) => {
  const labelsRow = (
    <TableRow>
      <TableCell align='center'>ID</TableCell>

      {dataFrame.labels.slice(1).map(label => {
        const labelChecked = checkedLabels.indexOf(label) > -1;

        return (
          <TableCell sx={getCellStyle(labelChecked)} key={label}>
            <CheckBox value={label} onSelect={onLabelCheck} checked={labelChecked} />
          </TableCell>
        );
      })}
    </TableRow>
  );

  const tableRows = (
    <>
      {dataFrame.rows.map(row => {
        const rowID = row[0] as number;
        const rowChecked = checkedRows.indexOf(rowID) > -1;

        return (
          <TableRow sx={getCellStyle(rowChecked)} key={rowID}>
            <TableCell>
              <CheckBox value={rowID} onSelect={onRowCheck} checked={rowChecked} />
            </TableCell>

            {row.slice(1).map((value, index) => {
              const columnLabel = dataFrame.labels[index + 1];
              const cellChecked = checkedLabels.indexOf(columnLabel) > -1;
              const formatedValue =
                typeof value === 'number' && decimalsPrecision !== 'all'
                  ? value.toFixed(decimalsPrecision)
                  : value === ''
                  ? 'NA'
                  : value;

              return (
                <TableCell
                  sx={{ ...getCellStyle(cellChecked) }}
                  key={`${rowID}-${columnLabel}`}
                  align={typeof value === 'number' ? 'right' : 'left'}>
                  {formatedValue}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );

  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table size='small' stickyHeader aria-label='dataframe-viewer'>
          <TableHead>{labelsRow}</TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export const DataFrame = React.memo(_DataFrame);

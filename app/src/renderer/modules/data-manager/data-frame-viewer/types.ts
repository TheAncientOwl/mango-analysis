export interface IDataFrame {
  labels: string[];
  totalRows: number;
  rows: (string | number)[][];
  missingValues: boolean;
}

export type DecimalsPrecision = number | 'all';

export interface IDataFrameState {
  dataFrame: IDataFrame;
  checkedLabels: string[];
  checkedRows: number[];
  decimalsPrecision: DecimalsPrecision;
}

interface IDataFrameEvents {
  onLabelCheck: (checkedLabel: string) => void;
  onRowCheck: (checkedRow: number) => void;
}

export type DataFrameViewerProps = IDataFrameState & IDataFrameEvents;

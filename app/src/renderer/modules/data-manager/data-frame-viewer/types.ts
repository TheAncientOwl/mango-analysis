export interface DataFrame {
  labels: string[];
  totalRows: number;
  rows: (string | number)[][];
  missingValues: boolean;
}

export type DecimalsPrecision = number | 'all';

export interface DataFrameState {
  dataFrame: DataFrame;
  checkedLabels: string[];
  checkedRows: number[];
  decimalsPrecision: DecimalsPrecision;
}

interface DataFrameEvents {
  onLabelCheck: (checkedLabel: string) => void;
  onRowCheck: (checkedRow: number) => void;
}

export type DataFrameViewerProps = DataFrameState & DataFrameEvents;

export interface DataFrame {
  labels: string[];
  totalRows: number;
  rows: (string | number)[][];
}

export type DecimalsPrecision = number | 'all';

export interface DataFrameState {
  dataFrame: DataFrame;
  checkedLabels: Set<string>;
  checkedRows: Set<number>;
  decimalsPrecision: DecimalsPrecision;
}

interface DataFrameEvents {
  onLabelCheck: (checkedLabel: string) => void;
  onRowCheck: (checkedRow: number) => void;
}

export type DataFrameViewerProps = DataFrameState & DataFrameEvents;

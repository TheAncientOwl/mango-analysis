export interface DataFrame {
  labels: string[];
  totalRows: number;
  rows: (string | number)[][];
}

export type DecimalsPrecision = number | 'default';

export interface DataFrameConfig {
  dataFrame: DataFrame;
  page: number;
  pageSize: number;
  checkedLabels: Set<string>;
  checkedRows: Set<number>;
  decimalsPrecision: DecimalsPrecision;
}

interface DataFrameEvents {
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  onLabelCheck: (checkedLabel: string) => void;
  onRowCheck: (checkedRow: number) => void;
}

export type DataFrameViewerProps = DataFrameConfig & DataFrameEvents;

import React from 'react';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TableViewIcon from '@mui/icons-material/TableView';

import { ExportTab } from './ExportTab';
import { ViewTab } from './ViewTab';

interface Feature {
  label: string;
  icon: string | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  component: React.ReactNode;
}

export const DataManagerConfig: ReadonlyArray<Feature> = [
  { label: 'Export', icon: <FileDownloadIcon />, component: <ExportTab /> },
  { label: 'Table', icon: <TableViewIcon />, component: <ViewTab /> },
];

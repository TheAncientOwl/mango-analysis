import React from 'react';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TableViewIcon from '@mui/icons-material/TableView';

import { ImportTab } from './ImportTab';
import { ExportTab } from './ExportTab';
import { ViewTab } from './ViewTab';

interface Feature {
  label: string;
  icon: string | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  component: React.ReactNode;
}

export const DataManagerConfig: ReadonlyArray<Feature> = [
  { label: 'Import', icon: <FileUploadIcon />, component: <ImportTab /> },
  { label: 'Export', icon: <FileDownloadIcon />, component: <ExportTab /> },
  { label: 'Table', icon: <TableViewIcon />, component: <ViewTab /> },
];

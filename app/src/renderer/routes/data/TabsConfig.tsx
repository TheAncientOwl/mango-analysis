import React from 'react';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import TableViewIcon from '@mui/icons-material/TableView';

import { ImportTab } from './ImportTab';
import { ExportTab } from './ExportTab';
import { EditTab } from './EditTab';
import { ViewTab } from './ViewTab';

interface Feature {
  label: string;
  icon: string | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  component: React.ReactNode;
}

export const TabsConfig: ReadonlyArray<Feature> = [
  { label: 'Import', icon: <FileUploadIcon />, component: <ImportTab /> },
  { label: 'Export', icon: <FileDownloadIcon />, component: <ExportTab /> },
  { label: 'Edit', icon: <EditIcon />, component: <EditTab /> },
  { label: 'View', icon: <TableViewIcon />, component: <ViewTab /> },
];

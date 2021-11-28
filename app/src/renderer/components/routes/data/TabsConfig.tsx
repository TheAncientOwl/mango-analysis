import React from 'react';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import TableViewIcon from '@mui/icons-material/TableView';

import { Import } from './Import';
import { Export } from './Export';
import { Edit } from './Edit';
import { View } from './View';

interface Feature {
  label: string;
  icon: string | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  component: React.ReactNode;
}

export const TabsConfig: ReadonlyArray<Feature> = [
  { label: 'Import', icon: <FileUploadIcon />, component: <Import /> },
  { label: 'Export', icon: <FileDownloadIcon />, component: <Export /> },
  { label: 'Edit', icon: <EditIcon />, component: <Edit /> },
  { label: 'View', icon: <TableViewIcon />, component: <View /> },
];

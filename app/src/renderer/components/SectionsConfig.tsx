import TableViewIcon from '@mui/icons-material/TableView';
import BarChartIcon from '@mui/icons-material/BarChart';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import React from 'react';

interface Section {
  title: string;
  icon: React.ReactNode | null;
}

export const SectionsConfig: Section[] = [
  { title: 'data', icon: <TableViewIcon /> },
  { title: 'graphs', icon: <BarChartIcon /> },
  { title: 'analysis', icon: <AutoAwesomeIcon /> },
];

import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableViewIcon from '@mui/icons-material/TableView';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { Home, Data, Graphs, Analysis } from '../routes';

interface Route {
  name: string;
  routePath: string;
  element: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  icon: React.ReactNode;
}

export const SectionsArray: ReadonlyArray<Route> = [
  { name: 'home', routePath: '/', element: <Home />, icon: <HomeIcon /> },
  { name: 'data', routePath: 'data', element: <Data />, icon: <TableViewIcon /> },
  { name: 'graphs', routePath: 'graphs', element: <Graphs />, icon: <BarChartIcon /> },
  { name: 'analysis', routePath: 'analysis', element: <Analysis />, icon: <AutoAwesomeIcon /> },
];

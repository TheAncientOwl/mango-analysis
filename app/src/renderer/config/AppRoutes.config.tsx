import React from 'react';

import TableViewIcon from '@mui/icons-material/TableView';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import DataManager from '@modules/data-manager';
import PrincipalComponentsAnalysis from '@modules/principal-components-analysis';
import FactorAnalysis from '@modules/factor-analysis';
import LinearRegression from '@modules/linear-regression';
import MultipleLinearRegression from '@modules/multiple-linear-regression';

interface Route {
  name: string;
  alias: string;
  routePath: string;
  element: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  icon: React.ReactNode;
}

export const AppRoutes: ReadonlyArray<Route> = [
  { name: 'data manager', alias: 'data manager', routePath: '/', element: <DataManager />, icon: <TableViewIcon /> },
  {
    name: 'principal components analysis',
    alias: 'PCA',
    routePath: '/pca',
    element: <PrincipalComponentsAnalysis />,
    icon: <SettingsInputComponentIcon />,
  },
  {
    name: 'factor analysis',
    alias: 'Factor Analysis',
    routePath: '/factor-analysis',
    element: <FactorAnalysis />,
    icon: <BubbleChartIcon />,
  },
  {
    name: 'linear regression',
    alias: 'Regression',
    routePath: '/linear-regression',
    element: <LinearRegression />,
    icon: <AutoGraphIcon />,
  },
  {
    name: 'multiple linear regression',
    alias: 'Multiple Regression',
    routePath: '/multiple-linear-regression',
    element: <MultipleLinearRegression />,
    icon: <AutoAwesomeIcon />,
  },
];

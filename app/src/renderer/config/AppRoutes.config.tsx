import React from 'react';

import TableViewIcon from '@mui/icons-material/TableView';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

import DataManager from '@modules/data-manager';
import PrincipalComponentsAnalysis from '@modules/principal-components-analysis';
import FactorAnalysis from '@modules/factor-analysis';
import LinearRegression from '@modules/linear-regression';
import LogisticRegression from '@modules/logistic-regression';
import CorrespondenceAnalysis from '@modules/correspondence-analysis';
import ClusterAnalysis from '@modules/cluster-analysis';
import Knn from '@modules/knn';
import Som from '@modules/som';
import Svm from '@modules/svm';

interface IRoute {
  name: string;
  url: string;
  element: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
  icon: React.ReactNode;
}

export const AppRoutes: ReadonlyArray<IRoute> = [
  { name: 'data manager', url: '/', element: <DataManager />, icon: <TableViewIcon /> },
  {
    name: 'principal components analysis',
    url: '/pca',
    element: <PrincipalComponentsAnalysis />,
    icon: <SettingsInputComponentIcon />,
  },
  {
    name: 'factor analysis',
    url: '/factor-analysis',
    element: <FactorAnalysis />,
    icon: <BubbleChartIcon />,
  },
  {
    name: 'linear regression',
    url: '/linear-regression',
    element: <LinearRegression />,
    icon: <AutoGraphIcon />,
  },
  {
    name: 'logistic regression',
    url: '/logistic-regression',
    element: <LogisticRegression />,
    icon: <AutoFixHighIcon />,
  },
  {
    name: 'correspondence analysis',
    url: '/correspondence-analysis',
    element: <CorrespondenceAnalysis />,
    icon: <StackedLineChartIcon />,
  },
  {
    name: 'cluster analysis',
    url: '/cluster-analysis',
    element: <ClusterAnalysis />,
    icon: <AutoAwesomeIcon />,
  },
  {
    name: 'KNN',
    url: '/knn',
    element: <Knn />,
    icon: <PeopleIcon />,
  },
  {
    name: 'SOM',
    url: '/som',
    element: <Som />,
    icon: <MapIcon />,
  },
  {
    name: 'Svm',
    url: '/svm',
    element: <Svm />,
    icon: <PrecisionManufacturingIcon />,
  },
];

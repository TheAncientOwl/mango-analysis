import React from 'react';

import { IStep } from '@components/analysis';

import ModelPicker from './ModelPicker';
import RegressionResults from './RegressionResults';
import Prediction from './Prediction';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  RegressionResults: 1,
  Prediction: 2,
});

export const StepsLinearRegression: ReadonlyArray<IStep> = [
  {
    index: StepsID.ModelPicker,
    title: 'Pick features',
    content: <ModelPicker />,
  },
  {
    index: StepsID.RegressionResults,
    title: 'Results',
    content: <RegressionResults />,
  },
  {
    index: StepsID.Prediction,
    title: 'Predictions',
    content: <Prediction />,
  },
];

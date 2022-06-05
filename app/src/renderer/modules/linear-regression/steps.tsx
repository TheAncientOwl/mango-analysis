import React from 'react';

import { StepConfig } from '@components/analysis-step';

import ModelPicker from './components/ModelPicker';
import RegressionResults from './components/RegressionResults';
import Prediction from './components/Prediction';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  RegressionResults: 1,
  Prediction: 2,
});

export const StepsLinearRegression: ReadonlyArray<StepConfig> = [
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

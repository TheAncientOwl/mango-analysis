import React from 'react';

import { StepConfig } from '@components/analysis';

import ModelPicker from './ModelPicker';
import MultipleRegressionResults from './MultipleRegressionResults';
import Prediction from './Prediction';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  MultipleRegressionResults: 1,
  Prediction: 2,
});

export const StepsMultipleLinearRegression: ReadonlyArray<StepConfig> = [
  {
    index: StepsID.ModelPicker,
    title: 'Pick features',
    content: <ModelPicker />,
  },
  {
    index: StepsID.MultipleRegressionResults,
    title: 'Results',
    content: <MultipleRegressionResults />,
  },
  {
    index: StepsID.Prediction,
    title: 'Predictions',
    content: <Prediction />,
  },
];

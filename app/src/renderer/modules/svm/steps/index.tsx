import React from 'react';

import { IStep } from '@components/analysis';
import ModelPicker from './ModelPicker';
import Predictions from './Predictions';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  Predictions: 1,
});

export const StepsSvm: ReadonlyArray<IStep> = [
  {
    index: StepsID.ModelPicker,
    title: 'Model Picker',
    content: <ModelPicker />,
  },
  {
    index: StepsID.Predictions,
    title: 'Predictions',
    content: <Predictions />,
  },
];

import React from 'react';

import { IStep } from '@components/analysis';
import ModelPicker from './ModelPicker';
import Plots from './Plots';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  Plots: 1,
});

export const StepsSom: ReadonlyArray<IStep> = [
  {
    index: StepsID.ModelPicker,
    title: 'Model Picker',
    content: <ModelPicker />,
  },
  {
    index: StepsID.Plots,
    title: 'Plots',
    content: <Plots />,
  },
];

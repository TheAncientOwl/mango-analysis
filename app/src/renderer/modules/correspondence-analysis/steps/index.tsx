import React from 'react';

import { IStep } from '@components/analysis';
import ModelPicker from './ModelPicker';
import Summary from './Summary';
import Plots from './Plots';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  Summary: 1,
  Plots: 2,
});

export const StepsCorrespondenceAnalysis: ReadonlyArray<IStep> = [
  {
    index: StepsID.ModelPicker,
    title: 'Model Pick',
    content: <ModelPicker />,
  },
  {
    index: StepsID.Summary,
    title: 'Analysis Summary',
    content: <Summary />,
  },
  {
    index: StepsID.Plots,
    title: 'Plot data',
    content: <Plots />,
  },
];

import React from 'react';

import { IStep } from '@components/analysis';
import ModelPicker from './ModelPicker';
import Summary from './Summary';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  Summary: 1,
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
];

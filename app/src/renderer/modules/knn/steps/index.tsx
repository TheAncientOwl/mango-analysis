import React from 'react';

import { IStep } from '@components/analysis';

import ModelPicker from './ModelPicker';
import Models from './Models';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  Models: 1,
});

export const StepsKnn: ReadonlyArray<IStep> = [
  {
    index: StepsID.ModelPicker,
    title: 'Model Picker',
    content: <ModelPicker />,
  },
  {
    index: StepsID.Models,
    title: 'Models',
    content: <Models />,
  },
];

import React from 'react';

import { IStep } from '@components/analysis';

import ModelPicker from './ModelPicker';
import Models from './Models';
import PredictionModel from './PredictionModel';
import Prediction from './Prediction';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  Models: 1,
  PredictionModel: 2,
  Prediction: 3,
});

export const StepsKnn: ReadonlyArray<IStep> = [
  {
    index: StepsID.ModelPicker,
    title: 'Model Picker',
    content: <ModelPicker />,
  },
  {
    index: StepsID.Models,
    title: 'Run Models',
    content: <Models />,
  },
  {
    index: StepsID.PredictionModel,
    title: 'Choose prediction model',
    content: <PredictionModel />,
  },
  {
    index: StepsID.Prediction,
    title: 'Prediction',
    content: <Prediction />,
  },
];

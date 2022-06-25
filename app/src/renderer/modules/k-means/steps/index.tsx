import React from 'react';

import { store } from '@store/.';
import { setServerLabelFeatures } from '@store/k-means/actions';

import { IStep } from '@components/analysis';

import ModelPicker from './ModelPicker';
import Plots from './Plots';
import Clusters from './Clusters';

export const StepsID = Object.freeze({
  ModelPicker: 0,
  Plots: 1,
  Clusters: 2,
});

export const StepsClusterAnalysis: ReadonlyArray<IStep> = [
  {
    index: StepsID.ModelPicker,
    title: 'Pick model arguments',
    content: <ModelPicker />,
    onNext: () => {
      store.dispatch(setServerLabelFeatures());
    },
  },
  {
    index: StepsID.Plots,
    title: 'Clusters count plots',
    content: <Plots />,
  },
  {
    index: StepsID.Clusters,
    title: 'Create clusters',
    content: <Clusters />,
  },
];

import React from 'react';

import { StepConfig } from '@components/analysis';

import { store } from '@store/.';
import {
  fetchAnalysisHints,
  fetchTargetsLabelsPCA,
  lockNextStep,
  setServerTargetAndFeatures,
} from '@store/principal-components-analysis/actions';

import TargetAndFeaturesPicker from './TargetAndFeaturesPicker';
import CorrelationMatrix from './CorrelationMatrix';
import ComponentsCountPicker from './ComponentsCountPicker';
import LoadingsMatrix from './LoadingsMatrix';
import DataVisualizer from './DataVisualizer';

export const StepsID = Object.freeze({
  TargetAndFeaturesPicker: 0,
  CorrelationMatrix: 1,
  ComponentsCountPicker: 2,
  LoadingsMatrix: 3,
  DataVisualizer: 4,
});

export const StepsPCA: ReadonlyArray<StepConfig> = [
  {
    index: StepsID.TargetAndFeaturesPicker,
    title: 'Pick target and features',
    content: <TargetAndFeaturesPicker />,
    onNext: () => {
      const state = store.getState();
      store.dispatch(setServerTargetAndFeatures(state.pca.target, state.pca.features));
    },
  },
  {
    index: StepsID.CorrelationMatrix,
    title: 'Plot correlation matrix',
    content: <CorrelationMatrix />,
    onNext: () => {
      store.dispatch(fetchAnalysisHints());
    },
  },
  {
    index: StepsID.ComponentsCountPicker,
    title: 'Pick components count',
    content: <ComponentsCountPicker />,
    onPrev: () => {
      store.dispatch(lockNextStep(StepsID.ComponentsCountPicker));
    },
  },
  {
    index: StepsID.LoadingsMatrix,
    title: 'Plot loadings matrix',
    content: <LoadingsMatrix />,
    onNext: () => {
      store.dispatch(fetchTargetsLabelsPCA());
    },
  },
  {
    index: StepsID.DataVisualizer,
    title: 'Visualize data',
    content: <DataVisualizer />,
  },
];

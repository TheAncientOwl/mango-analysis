import React from 'react';

import { StepConfig } from '@components/analysis-step';

import { store } from '@store/.';
import {
  fetchAnalysisHints,
  fetchTargetsLabelsPCA,
  lockNextStep,
  setServerTargetAndFeatures,
} from '@store/principal-components-analysis/actions';

import TargetAndFeaturesPicker from './TargetAndFeaturesPicker';
// import ScaleHandler from './ScaleHandler';
import CorrelationMatrix from './CorrelationMatrix';
import ComponentsCountPicker from './ComponentsCountPicker';
import LoadingsMatrix from './LoadingsMatrix';
import DataVisualizer from './DataVisualizer';

import { ComponentIndexPCA } from './ComponentIndexPCA';

export const StepsPCA: ReadonlyArray<StepConfig> = [
  {
    index: ComponentIndexPCA.TargetAndFeaturesPicker,
    title: 'Pick target and features',
    content: <TargetAndFeaturesPicker />,
    onNext: () => {
      const state = store.getState();
      store.dispatch(setServerTargetAndFeatures(state.pca.target, state.pca.features));
    },
  },
  // {
  //   index: ComponentIndexPCA.ScaleHandler,
  //   title: 'Scale data',
  //   content: <ScaleHandler />,
  // },
  {
    index: ComponentIndexPCA.CorrelationMatrix,
    title: 'Plot correlation matrix',
    content: <CorrelationMatrix />,
    onNext: () => {
      store.dispatch(fetchAnalysisHints());
    },
  },
  {
    index: ComponentIndexPCA.ComponentsCountPicker,
    title: 'Pick components count',
    content: <ComponentsCountPicker />,
    onPrev: () => {
      store.dispatch(lockNextStep(ComponentIndexPCA.ComponentsCountPicker));
    },
  },
  {
    index: ComponentIndexPCA.LoadingsMatrix,
    title: 'Plot loadings matrix',
    content: <LoadingsMatrix />,
    onNext: () => {
      store.dispatch(fetchTargetsLabelsPCA());
    },
  },
  {
    index: ComponentIndexPCA.DataVisualizer,
    title: 'Visualize data',
    content: <DataVisualizer />,
  },
];

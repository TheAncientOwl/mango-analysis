import React from 'react';

import { StepConfig } from '@components/analysis-step';

import { store } from '@store/.';
import {
  fetchAnalysisHints,
  fetchTargetsLabelsPCA,
  lockNextStep,
  setServerTargetAndFeatures,
} from '@store/principal-components-analysis/actions';

import TargetAndFeaturesPicker from '../TargetAndFeaturesPicker';
import CorrelationMatrix from '../CorrelationMatrix';
import ComponentsCountPicker from '../ComponentsCountPicker';
import LoadingsMatrix from '../LoadingsMatrix';
import DataVisualizer from '../DataVisualizer';

import { ComponentsID } from './componentsID';

export const StepsPCA: ReadonlyArray<StepConfig> = [
  {
    index: ComponentsID.TargetAndFeaturesPicker,
    title: 'Pick target and features',
    content: <TargetAndFeaturesPicker />,
    onNext: () => {
      const state = store.getState();
      store.dispatch(setServerTargetAndFeatures(state.pca.target, state.pca.features));
    },
  },
  {
    index: ComponentsID.CorrelationMatrix,
    title: 'Plot correlation matrix',
    content: <CorrelationMatrix />,
    onNext: () => {
      store.dispatch(fetchAnalysisHints());
    },
  },
  {
    index: ComponentsID.ComponentsCountPicker,
    title: 'Pick components count',
    content: <ComponentsCountPicker />,
    onPrev: () => {
      store.dispatch(lockNextStep(ComponentsID.ComponentsCountPicker));
    },
  },
  {
    index: ComponentsID.LoadingsMatrix,
    title: 'Plot loadings matrix',
    content: <LoadingsMatrix />,
    onNext: () => {
      store.dispatch(fetchTargetsLabelsPCA());
    },
  },
  {
    index: ComponentsID.DataVisualizer,
    title: 'Visualize data',
    content: <DataVisualizer />,
  },
];
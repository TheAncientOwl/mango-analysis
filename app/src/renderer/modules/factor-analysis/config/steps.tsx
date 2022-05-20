import React from 'react';

import { StepConfig } from '@components/analysis-step';

import { store } from '@store/.';
import { setServerFeatures } from '@store/factor-analysis/actions';

import { ComponentsID } from './componentsID';

import FeaturesPicker from '../components/FeaturesPicker';
import StatisticalHypotesisTesting from '../components/StatisticalHypotesisTesting';

export const StepsFactorAnalysis: ReadonlyArray<StepConfig> = [
  {
    index: ComponentsID.FeaturesPicker,
    title: 'Pick features',
    content: <FeaturesPicker />,
    onNext: () => {
      const state = store.getState();
      store.dispatch(setServerFeatures(state.factorAnalysis.features));
    },
  },
  {
    index: ComponentsID.StatisticalHypotesisTesting,
    title: 'Statistical hypothesis testing',
    content: <StatisticalHypotesisTesting />,
  },
];

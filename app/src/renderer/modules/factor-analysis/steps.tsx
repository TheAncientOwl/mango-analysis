import React from 'react';

import { StepConfig } from '@components/analysis';

import { store } from '@store/.';
import { setServerFeatures } from '@store/factor-analysis/actions';

import FeaturesPicker from './components/FeaturesPicker';
import StatisticalHypotesisTesting from './components/StatisticalHypotesisTesting';
import DefaultFactorAnalysis from './components/DefaultFactorAnalysis';
import Analysis from './components/Analysis';

export const StepsID = Object.freeze({
  FeaturesPicker: 0,
  StatisticalHypotesisTesting: 1,
  DefaultFactorAnalysis: 2,
  Analysis: 3,
});

export const StepsFactorAnalysis: ReadonlyArray<StepConfig> = [
  {
    index: StepsID.FeaturesPicker,
    title: 'Pick features',
    content: <FeaturesPicker />,
    onNext: () => {
      const state = store.getState();
      store.dispatch(setServerFeatures(state.factorAnalysis.features));
    },
  },
  {
    index: StepsID.StatisticalHypotesisTesting,
    title: 'Statistical hypothesis testing',
    content: <StatisticalHypotesisTesting />,
  },
  {
    index: StepsID.DefaultFactorAnalysis,
    title: 'Default analysis',
    content: <DefaultFactorAnalysis />,
  },
  {
    index: StepsID.Analysis,
    title: 'Axis rotation',
    content: <Analysis />,
  },
];

import React from 'react';

import { StepConfig } from '../AnalysisStep';

import { axios } from '@renderer/config';

import { PrincipalComponentsAnalysisState, PCA_Dispatcher, ActionType } from './state';

import { TargetAndFeaturesPicker } from './TargetAndFeaturesPicker';
import { ScaleHandler } from './ScaleHandler';
import { CorrelationMatrix } from './CorrelationMatrix';
import { ComponentsCountPicker } from './ComponentsCountPicker';
import { LoadingsMatrix } from './LoadingsMatrix';

export const PCA_Steps: ReadonlyArray<StepConfig<PrincipalComponentsAnalysisState, PCA_Dispatcher>> = [
  {
    index: 1,
    title: 'Pick target and features',
    content: <TargetAndFeaturesPicker />,
    onNext: (state, dispatch) => {
      dispatch({ type: ActionType.Loading });
      axios
        .post('pca/set/target&features', {
          target: state.target,
          features: Array.from(state.features),
        })
        .then(() => {
          dispatch({ type: ActionType.EndLoading });
        });
    },
  },
  {
    index: 2,
    title: 'Scale data',
    content: <ScaleHandler />,
  },
  {
    index: 3,
    title: 'Plot correlation matrix',
    content: <CorrelationMatrix />,
  },
  {
    index: 4,
    title: 'Pick components count',
    content: <ComponentsCountPicker />,
  },
  {
    index: 5,
    title: 'Plot loadings matrix',
    content: <LoadingsMatrix />,
  },
  {
    index: 6,
    title: 'Pick target and features',
    content: 'Plot observations',
  },
];

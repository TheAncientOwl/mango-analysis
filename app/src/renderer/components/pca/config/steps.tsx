import React from 'react';

import { StepConfig } from '../../AnalysisStep';

import { axios } from '@renderer/config';

import { PrincipalComponentsAnalysisState } from './state';
import { PCA_Dispatcher } from './reducer';
import { PCA } from './index';

import { TargetAndFeaturesPicker } from '../TargetAndFeaturesPicker';
import { ScaleHandler } from '../ScaleHandler';
import { CorrelationMatrix } from '../CorrelationMatrix';
import { ComponentsCountPicker } from '../ComponentsCountPicker';
import { LoadingsMatrix } from '../LoadingsMatrix';

export const ComponentIndex = Object.freeze({
  TargetAndFeaturesPicker: 1,
  ScaleHandler: 2,
  CorrelationMatrix: 3,
  ComponentsCountPicker: 4,
  LoadingsMatrix: 5,
  Plot2D: 6,
});

export const Steps: ReadonlyArray<StepConfig<PrincipalComponentsAnalysisState, PCA_Dispatcher>> = [
  {
    index: 1,
    title: 'Pick target and features',
    content: <TargetAndFeaturesPicker />,
    onNext: (state, dispatch) => {
      dispatch({ type: PCA.ActionType.Loading });
      axios
        .post('pca/set/target&features', {
          target: state.target,
          features: Array.from(state.features),
        })
        .then(() => {
          dispatch({ type: PCA.ActionType.EndLoading });
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
    onPrev: (state, dispatch) => {
      dispatch({ type: PCA.ActionType.SetCorrelationMatrixPath, payload: '' });
    },
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
    onPrev: (state, dispatch) => {
      dispatch({ type: PCA.ActionType.SetLoadingsMatrixPath, payload: '' });
    },
  },
  {
    index: 6,
    title: 'Pick target and features',
    content: 'Plot observations',
  },
];

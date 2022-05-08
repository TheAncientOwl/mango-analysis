import React from 'react';

import { StepConfig } from '../../analysis-step';

import { axios } from '@renderer/config';

import { PrincipalComponentsAnalysisState } from './state';
import { PCA_Dispatcher } from './reducer';
import { PCA } from './index';

import { TargetAndFeaturesPicker } from '../TargetAndFeaturesPicker';
import { ScaleHandler } from '../ScaleHandler';
import { CorrelationMatrix } from '../CorrelationMatrix';
import { ComponentsCountPicker } from '../ComponentsCountPicker';
import { LoadingsMatrix } from '../LoadingsMatrix';
import { DataVisualizer } from '../DataVisualizer';

export const ComponentIndex = Object.freeze({
  TargetAndFeaturesPicker: 1,
  ScaleHandler: 2,
  CorrelationMatrix: 3,
  ComponentsCountPicker: 4,
  LoadingsMatrix: 5,
  DataVisualizer: 6,
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
    onNext: (state, dispatch) => {
      dispatch({ type: PCA.ActionType.Loading });

      axios.post('/pca/analyze').then(() => {
        axios.get('/pca/components-count-hints').then(res => {
          dispatch({ type: PCA.ActionType.FetchedComponentsCountHints, payload: res.data });
        });
      });
    },
  },
  {
    index: 4,
    title: 'Pick components count',
    content: <ComponentsCountPicker />,
    onPrev: (state, dispatch) => {
      dispatch({
        type: PCA.ActionType.SetUnlockedStep,
        payload: { index: PCA.ComponentIndex.ComponentsCountPicker + 1, allowed: false },
      });
    },
  },
  {
    index: 5,
    title: 'Plot loadings matrix',
    content: <LoadingsMatrix />,
    onNext: (state, dispatch) => {
      dispatch({ type: PCA.ActionType.Loading });

      axios.get('/pca/targets&labels').then(res => {
        dispatch({ type: PCA.ActionType.FetchedTargetsAndLabels, payload: res.data });
      });
    },
  },
  {
    index: 6,
    title: 'Visualize data',
    content: <DataVisualizer />,
  },
];

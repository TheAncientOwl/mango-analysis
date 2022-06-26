import React from 'react';

import { store } from '@store/.';
import { setServerTargetFeatures } from '@store/knn/actions';

import { IStep } from '@components/analysis';

import ModelPicker from './ModelPicker';

export const StepsID = Object.freeze({
  ModelPicker: 0,
});

export const StepsKnn: ReadonlyArray<IStep> = [
  {
    index: StepsID.ModelPicker,
    title: 'Model Picker',
    content: <ModelPicker />,
    onNext: () => {
      store.dispatch(setServerTargetFeatures());
    },
  },
];

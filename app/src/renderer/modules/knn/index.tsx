import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/knn/actions';

import { Analysis } from '@components/analysis';

import { StepsKnn } from './steps';

const Knn: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsKnn}
      nextStep={props.nextStep}
      prevStep={props.prevStep}
      currentStep={props.currentStep}
      unlockedSteps={props.unlockedSteps}
      loading={props.loading}
    />
  );
};

// <redux>
const mapState = (state: RootState) => ({
  loading: state.knn.loading,
  currentStep: state.knn.currentStep,
  unlockedSteps: state.knn.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Knn);
// </redux>


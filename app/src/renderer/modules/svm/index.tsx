import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/svm/actions';

import { Analysis } from '@components/analysis';

import { StepsSvm } from './steps';

const Svm: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsSvm}
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
  loading: state.svm.loading,
  currentStep: state.svm.currentStep,
  unlockedSteps: state.svm.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Svm);
// </redux>


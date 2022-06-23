import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/som/actions';

import { Analysis } from '@components/analysis';

import { StepsSom } from './steps';

const Som: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsSom}
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
  loading: state.som.loading,
  currentStep: state.som.currentStep,
  unlockedSteps: state.som.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Som);
// </redux>


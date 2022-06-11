import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/logistic-regression/actions';

import { Analysis } from '@components/analysis';

import { StepsLogisticRegression } from './steps';

const LogisticRegression: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsLogisticRegression}
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
  loading: state.logisticRegression.loading,
  currentStep: state.logisticRegression.currentStep,
  unlockedSteps: state.logisticRegression.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LogisticRegression);
// </redux>


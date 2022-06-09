import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@src/renderer/store/linear-regression/actions';

import { Analysis } from '@components/analysis';

import { StepsLinearRegression } from './steps';

const LinearRegression: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsLinearRegression}
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
  loading: state.linearRegression.loading,
  currentStep: state.linearRegression.currentStep,
  unlockedSteps: state.linearRegression.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LinearRegression);
// </redux>

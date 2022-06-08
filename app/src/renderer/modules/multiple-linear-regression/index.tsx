import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/multiple-linear-regression/actions';

import { Analysis } from '@components/analysis';

import { StepsMultipleLinearRegression } from './steps';

const MultipleLinearRegression: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsMultipleLinearRegression}
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
  loading: state.multipleLinearRegression.loading,
  currentStep: state.multipleLinearRegression.currentStep,
  unlockedSteps: state.multipleLinearRegression.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MultipleLinearRegression);
// </redux>

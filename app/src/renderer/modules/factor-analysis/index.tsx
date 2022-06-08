import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/factor-analysis/actions';

import { Analysis } from '@components/analysis';

import { StepsFactorAnalysis } from './steps';

const FactorAnalysis: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsFactorAnalysis}
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
  loading: state.factorAnalysis.loading,
  currentStep: state.factorAnalysis.currentStep,
  unlockedSteps: state.factorAnalysis.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FactorAnalysis);
// </redux>

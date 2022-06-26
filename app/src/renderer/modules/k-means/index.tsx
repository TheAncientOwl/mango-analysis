import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/k-means/actions';

import { Analysis } from '@components/analysis';

import { StepsClusterAnalysis } from './steps';

const KMeans: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsClusterAnalysis}
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
  loading: state.kMeans.loading,
  currentStep: state.kMeans.currentStep,
  unlockedSteps: state.kMeans.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(KMeans);
// </redux>

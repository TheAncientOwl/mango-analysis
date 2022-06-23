import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/cluster-analysis/actions';

import { Analysis } from '@components/analysis';

import { StepsClusterAnalysis } from './steps';

const ClusterAnalysis: React.FC<PropsFromRedux> = props => {
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
  loading: state.clusterAnalysis.loading,
  currentStep: state.clusterAnalysis.currentStep,
  unlockedSteps: state.clusterAnalysis.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ClusterAnalysis);
// </redux>


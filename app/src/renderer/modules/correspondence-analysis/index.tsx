import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/correspondence-analysis/actions';

import { Analysis } from '@components/analysis';

import { StepsCorrespondenceAnalysis } from './steps';

const CorrespondenceAnalysis: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsCorrespondenceAnalysis}
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
  loading: state.correspondenceAnalysis.loading,
  currentStep: state.correspondenceAnalysis.currentStep,
  unlockedSteps: state.correspondenceAnalysis.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CorrespondenceAnalysis);
// </redux>


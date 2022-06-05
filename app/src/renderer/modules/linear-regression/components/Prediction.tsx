import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { predict, changeValueToPredict } from '@store/linear-regression/actions';

import { Typography, Collapse, Stack } from '@mui/material';

import { InputSave } from '@components/InputSave';
import { RunButton } from '@components/buttons';

const Prediction: React.FC<PropsFromRedux> = props => {
  return (
    <>
      <Stack direction='row' alignItems='center' gap={2} mb={2}>
        <InputSave
          text={props.valueToPredict}
          onSave={value => props.changeValueToPredict(value as number)}
          placeholder='Value to predict'
          tooltip='Value Saved'
          tooltipUnsaved='Value Not saved. Click to save'
          type='number'
        />

        <RunButton onClick={() => props.predict(props.valueToPredict)}>predict</RunButton>
      </Stack>

      <Collapse in={props.prediction !== undefined}>
        <Typography>Prediction: {props.prediction}</Typography>
      </Collapse>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  valueToPredict: state.linearRegression.valueToPredict,
  prediction: state.linearRegression.prediction,
});

const mapDispatch = {
  predict,
  changeValueToPredict,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Prediction);
// </redux>

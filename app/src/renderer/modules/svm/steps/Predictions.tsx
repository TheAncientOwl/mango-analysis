import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { predict, changeValuesToPredict } from '@store/svm/actions';

import { Collapse, Stack, Typography } from '@mui/material';

import { InputWithSave } from '@components/InputWithSave';
import { RunButton } from '@components/buttons';

const Prediction: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.changeValuesToPredict(new Array(props.features.length).fill(0));
  }, [props.features]);

  const handleChange = (index: number, value: number) => {
    const newValues = [...props.valuesToPredict];
    newValues[index] = value;

    props.changeValuesToPredict(newValues);
  };

  return (
    <>
      <Stack direction='column' gap={2} mb={2}>
        <Typography>Accuracy: {props.summary.accuracy}</Typography>
        <Typography>Precision: {props.summary.precision}</Typography>
        <Typography>Recall: {props.summary.recall}</Typography>
        {props.features.map((label, index) => (
          <InputWithSave
            key={index}
            onSave={value => handleChange(index, value as number)}
            text={props.valuesToPredict[index] === undefined ? 0 : props.valuesToPredict[index]}
            placeholder={label}
            tooltip='Value Saved'
            tooltipUnsaved='Value Not saved. Click to save'
            type='number'
          />
        ))}
      </Stack>

      <RunButton
        sx={{ mb: 2 }}
        disabled={props.valuesToPredict.some(value => value === undefined)}
        onClick={() => props.predict(props.valuesToPredict)}>
        predict
      </RunButton>

      <Collapse in={props.prediction !== undefined}>
        <Typography>Prediction: {props.prediction}</Typography>
      </Collapse>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  prediction: state.svm.prediction,
  valuesToPredict: state.svm.valuesToPredict,
  features: state.svm.features,
  summary: state.svm.summary,
});

const mapDispatch = {
  predict,
  changeValuesToPredict,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Prediction);
// </redux>

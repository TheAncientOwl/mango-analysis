import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { setServerPredictionModel } from '@store/knn/actions';

import { Stack } from '@mui/material';

import { Checkbox } from '@components/Checkbox';
import { AnalysisStepLogic } from '@components/analysis';

const PredictionModel: React.FC<PropsFromRedux> = props => {
  return (
    <AnalysisStepLogic>
      <Stack direction='column' gap={1} p={1} pl={2} mb={2}>
        {props.models.map((model, index) => (
          <Checkbox
            key={index}
            checked={model.name === props.predictionModelName}
            label={model.name}
            onChange={() => {
              props.setServerPredictionModel(model.name);
            }}
          />
        ))}
      </Stack>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  models: [state.knn.arbitraryModel, state.knn.gridModel, state.knn.gridModelWeights, state.knn.baggedModel].filter(
    model => model !== undefined
  ),
  predictionModelName: state.knn.predictionModelName,
});

const mapDispatch = {
  setServerPredictionModel,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PredictionModel);
// </redux>

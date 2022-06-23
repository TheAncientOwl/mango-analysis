import { resetState as resetStateCorrespondenceAnalysis } from './correspondence-analysis/actions';
import { resetState as resetStateLogisticRegression } from './logistic-regression/actions';
import { resetState as resetStateLinearRegression } from './linear-regression/actions';
import { resetState as resetStateFactorAnalysis } from './factor-analysis/actions';
import { resetState as resetStatePCA } from './principal-components-analysis/actions';
import { store } from '.';

export const resetAppState = () => {
  store.dispatch(resetStateLinearRegression());
  store.dispatch(resetStateFactorAnalysis());
  store.dispatch(resetStatePCA());
  store.dispatch(resetStateLogisticRegression());
  store.dispatch(resetStateCorrespondenceAnalysis());
};

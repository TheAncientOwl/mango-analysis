import { store } from '.';
import { resetState as resetStatePCA } from './principal-components-analysis/actions';
import { resetState as resetStateFactorAnalysis } from './factor-analysis/actions';
import { resetState as resetStateLinearRegression } from './linear-regression/actions';
import { resetState as resetStateMultipleLinearRegression } from './multiple-linear-regression/actions';

export const resetAppState = () => {
  store.dispatch(resetStatePCA());
  store.dispatch(resetStateFactorAnalysis());
  store.dispatch(resetStateLinearRegression());
  store.dispatch(resetStateMultipleLinearRegression());
};

import { store } from '.';
import { resetState as resetStatePCA } from './principal-components-analysis/actions';
import { resetState as resetStateFactorAnalysis } from './factor-analysis/actions';

export const resetAppState = () => {
  store.dispatch(resetStatePCA());
  store.dispatch(resetStateFactorAnalysis());
};

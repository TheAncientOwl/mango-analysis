import { axios } from '@src/renderer/config';
import { store } from '..';
import { Dispatch, ActionType } from './types';

export const setAppTitle = (title: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.SetAppTitle, payload: title });
};

export const toggleMenu = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ToggleMenu });
};

export const checkServerUp = () => async (dispatch: Dispatch) => {
  setInterval(async () => {
    const { serverUp } = store.getState().appGlobal;

    console.log(serverUp ? 'Server up' : 'Server down. fetching...');

    if (serverUp) return;

    try {
      await axios.get('/data/rows-between/0/20');
      dispatch({ type: ActionType.FetchedServerUpStatus, payload: true });
    } catch (err) {
      dispatch({ type: ActionType.FetchedServerUpStatus, payload: false });
    }
  }, 1000);
};

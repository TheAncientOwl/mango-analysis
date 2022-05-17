import { Dispatch, ActionType } from './types';

export const setAppTitle = (title: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.SetAppTitle, payload: title });
};

export const toggleMenu = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ToggleMenu });
};

// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  SetAppTitle = 'APP_GLOBAL__SET_APP_TITLE',
  ToggleMenu = 'APP_GLOBAL__TOGGLE_MENU',
}

interface SetAppTitle {
  type: typeof ActionType.SetAppTitle;
  payload: string;
}

interface ToggleMenu {
  type: typeof ActionType.ToggleMenu;
}

export type DispatchTypes = SetAppTitle | ToggleMenu;

export type Dispatch = ReduxDispatch<DispatchTypes>;

// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  SetAppTitle = 'SET_APP_TITLE',
  ToggleMenu = 'TOGGLE_MENU',
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

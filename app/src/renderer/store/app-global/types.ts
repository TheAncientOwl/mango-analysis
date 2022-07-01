// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  SetAppTitle = 'APP_GLOBAL__SET_APP_TITLE',
  ToggleMenu = 'APP_GLOBAL__TOGGLE_MENU',
  FetchedServerUpStatus = 'APP_GLOBAL__FETCHED_SERVER_UP_STATUS',
}

interface SetAppTitle {
  type: typeof ActionType.SetAppTitle;
  payload: string;
}

interface ToggleMenu {
  type: typeof ActionType.ToggleMenu;
}

interface FetchedServerUpStatus {
  type: typeof ActionType.FetchedServerUpStatus;
  payload: boolean;
}

export type DispatchTypes = SetAppTitle | ToggleMenu | FetchedServerUpStatus;

export type Dispatch = ReduxDispatch<DispatchTypes>;

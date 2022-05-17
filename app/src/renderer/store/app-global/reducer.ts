import { ActionType, DispatchTypes } from './types';

interface IDefaultState {
  appTitle: string;
  menuOpen: boolean;
}

const defaultState: IDefaultState = {
  appTitle: 'DataManager',
  menuOpen: false,
};

export const appGlobalReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
  switch (action.type) {
    case ActionType.SetAppTitle: {
      return {
        ...state,
        appTitle: action.payload,
      };
    }

    case ActionType.ToggleMenu: {
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
    }

    default: {
      return state;
    }
  }
};

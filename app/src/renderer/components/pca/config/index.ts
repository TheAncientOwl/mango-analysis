import { getDefaultState } from './state';
import { Context } from './context';
import { CacheKeys, clearCache } from './cacheKeys';
import { reducer, ActionType } from './reducer';
import { Steps, ComponentIndex } from './steps';

export const PCA = Object.freeze({
  Steps,
  ComponentIndex,

  CacheKeys,
  clearCache,

  getDefaultState,

  reducer,
  ActionType,

  Context,
  ContextProvider: Context.Provider,
});

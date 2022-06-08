# -------------------------------------------------------------------------------------------------
# >> Check arguments 
if ($args.Length -eq 0) {
  Write-Output @"
Introduce the words which compose the module name (all lowercase).
[Example]: .\new-module.ps1 test module
"@
  Exit
}

# -------------------------------------------------------------------------------------------------
# >> Create path names
$moduleDirectoryName = ""
Foreach ($arg in $args) {
  $moduleDirectoryName = $moduleDirectoryName + $arg + "-"
}
$moduleDirectoryName = $moduleDirectoryName.Substring(0, $moduleDirectoryName.Length - 1)
# Write-Output $moduleDirectoryName

$TextInfo = (Get-Culture).TextInfo
$moduleNameCamelCase = ""
Foreach ($arg in $args) {
  $moduleNameCamelCase = $moduleNameCamelCase + $TextInfo.ToTitleCase($arg)
}
$moduleNameCamelCase = $moduleNameCamelCase.Substring(0, 1).ToLower() + $moduleNameCamelCase.Substring(1)
# Write-Output $moduleNameCamelCase

$moduleNameUpperCase = ""
Foreach ($arg in $args) {
  $moduleNameUpperCase = $moduleNameUpperCase + $TextInfo.ToUpper($arg) + "_"
}
$moduleNameUpperCase = $moduleNameUpperCase.Substring(0, $moduleNameUpperCase.Length - 1)
# Write-Output $moduleNameUpperCase

$moduleNameCapitalized = ""
Foreach ($arg in $args) {
  $moduleNameCapitalized = $moduleNameCapitalized + $TextInfo.ToTitleCase($arg)
}
# Write-Output $moduleNameCapitalized

# -------------------------------------------------------------------------------------------------
# >> Create module directory and files
$moduleDirectoryPath = "$($PSScriptRoot)/src/renderer/modules/$($moduleDirectoryName)"
New-Item -Path $moduleDirectoryPath -ItemType Directory -ErrorAction SilentlyContinue

# >> Module index
New-Item -Path $moduleDirectoryPath -Name "index.tsx" -ErrorAction SilentlyContinue
Set-Content "$($moduleDirectoryPath)/index.tsx" @"
import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/$($moduleDirectoryName)/actions';

import { Analysis } from '@components/analysis';

import { Steps$($moduleNameCapitalized) } from './steps';

const $($moduleNameCapitalized): React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={Steps$($moduleNameCapitalized)}
      nextStep={props.nextStep}
      prevStep={props.prevStep}
      currentStep={props.currentStep}
      unlockedSteps={props.unlockedSteps}
      loading={props.loading}
    />
  );
};

// <redux>
const mapState = (state: RootState) => ({
  loading: state.$($moduleNameCamelCase).loading,
  currentStep: state.$($moduleNameCamelCase).currentStep,
  unlockedSteps: state.$($moduleNameCamelCase).nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector($($moduleNameCapitalized));
// </redux>

"@

New-Item -Path "$($moduleDirectoryPath)/steps" -ItemType Directory -ErrorAction SilentlyContinue
New-Item -Path "$($moduleDirectoryPath)/steps" -Name "index.tsx" -ErrorAction SilentlyContinue
Set-Content "$($moduleDirectoryPath)/steps/index.tsx" @"
import React from 'react';

import { StepConfig } from '@components/analysis';

export const StepsID = Object.freeze({});

export const Steps$($moduleNameCapitalized): ReadonlyArray<StepConfig> = [];

"@

# -------------------------------------------------------------------------------------------------
# >> Create store directory and files
$storeDirectoryPath = "$($PSScriptRoot)/src/renderer/store/$($moduleDirectoryName)"
New-Item -Path $storeDirectoryPath -ItemType Directory -ErrorAction SilentlyContinue

# >> Actions
New-Item -Path $storeDirectoryPath -Name "actions.ts" -ErrorAction SilentlyContinue
Set-Content "$($storeDirectoryPath)/actions.ts" @"
import { Dispatch, ActionType } from './types';

export const resetState = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Reset });
};

export const nextStep = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.NextStep });
};

export const prevStep = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PrevStep });
};

export const unlockNextStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.UnlockNextStep, payload: step });
};

export const lockNextStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.LockNextStep, payload: step });
};

export const jumpToStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.JumpToStep, payload: step });
};

"@

# >> Reducer
New-Item -Path $storeDirectoryPath -Name "reducer.ts" -ErrorAction SilentlyContinue
Set-Content "$($storeDirectoryPath)/reducer.ts" @"
import { ActionType, DispatchTypes } from './types';

import {
  IDefaultAnalysisStep,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
} from '@store/IDefaultAnalysisState';

const StepsCount = 0;

interface IDefaultState extends IDefaultAnalysisStep {
  specificStatePropery: string;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  specificStatePropery: 'dunno',
};

export const $($moduleNameCamelCase)Reducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
  switch (action.type) {
    case ActionType.Loading: {
      return loading(state) as IDefaultState;
    }

    case ActionType.NextStep: {
      return nextStep(state, StepsCount) as IDefaultState;
    }

    case ActionType.PrevStep: {
      return prevStep(state) as IDefaultState;
    }

    case ActionType.UnlockNextStep: {
      return unlockNextStep(state, action.payload) as IDefaultState;
    }

    case ActionType.LockNextStep: {
      return lockNextStep(state, action.payload) as IDefaultState;
    }

    case ActionType.JumpToStep: {
      return jumpToStep(state, action.payload) as IDefaultState;
    }

    case ActionType.Reset: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};

"@

# >> Types
New-Item -Path $storeDirectoryPath -Name "types.ts" -ErrorAction SilentlyContinue
Set-Content "$($storeDirectoryPath)/types.ts" @"
// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = '$($moduleNameUpperCase)__LOADING',
  Reset = '$($moduleNameUpperCase)__RESET',

  NextStep = '$($moduleNameUpperCase)__NEXT_STEP',
  PrevStep = '$($moduleNameUpperCase)__PREV_STEP',
  UnlockNextStep = '$($moduleNameUpperCase)__UNLOCK_NEXT_STEP',
  LockNextStep = '$($moduleNameUpperCase)__LOCK_NEXT_STEP',
  JumpToStep = '$($moduleNameUpperCase)__JUMP_TO_STEP',
}

interface Loading {
  type: ActionType.Loading;
}

interface Reset {
  type: ActionType.Reset;
}

interface NextStep {
  type: ActionType.NextStep;
}

interface PrevStep {
  type: ActionType.PrevStep;
}

interface UnlockNextStep {
  type: ActionType.UnlockNextStep;
  payload: number;
}

interface LockNextStep {
  type: ActionType.LockNextStep;
  payload: number;
}

interface JumpToStep {
  type: ActionType.JumpToStep;
  payload: number;
}

export type DispatchTypes = 
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep;

export type Dispatch = ReduxDispatch<DispatchTypes>;

"@

$storePath = "$($PSScriptRoot)/src/renderer/store"
# -------------------------------------------------------------------------------------------------
# >> Deal with root reducer file
New-Item -Path $storePath -Name "dummy.ts" -ErrorAction SilentlyContinue

$originalPath = "$($storePath)/index.ts"
$dummyPath = "$($storePath)/dummy.ts"

$importLine = "import { $($moduleNameCamelCase)Reducer } from './$($moduleDirectoryName)/reducer';"
$reducerLine = "    $($moduleNameCamelCase): $($moduleNameCamelCase)Reducer,"

Add-Content -Path $dummyPath -Value $importLine

Foreach ($line in Get-Content $originalPath) {
  if ($line -Match $importLine) {
    Remove-Item -Path $dummyPath
    Break
  }

  Add-Content -Path $dummyPath -Value $line

  if ($line -Match "  reducer: {") {    
    Add-Content -Path $dummyPath -Value $reducerLine
  }
}

if (Test-Path -Path $dummyPath -PathType Leaf) {
  Remove-Item $originalPath
  Move-Item -Path $dummyPath $originalPath
}

# -------------------------------------------------------------------------------------------------
# >> Deal with reset app state file
New-Item -Path $storePath -Name "dummy.ts" -ErrorAction SilentlyContinue

$originalPath = "$($storePath)/resetAppState.ts"
$dummyPath = "$($storePath)/dummy.ts"

$importLine = "import { resetState as resetState$($moduleNameCapitalized) } from './$($moduleDirectoryName)/actions';"
$resetLine = "  store.dispatch(resetState$($moduleNameCapitalized)());"

Add-Content -Path $dummyPath -Value $importLine

Foreach ($line in Get-Content $originalPath) {
  if ($line -Match $importLine) {
    Remove-Item -Path $dummyPath
    Break
  }
  
  if ($line -Match "};") {
    Add-Content -Path $dummyPath -Value $resetLine
  }
  
  Add-Content -Path $dummyPath -Value $line
}

if (Test-Path -Path $dummyPath -PathType Leaf) {
  Remove-Item $originalPath
  Move-Item -Path $dummyPath $originalPath
}

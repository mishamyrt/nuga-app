import { type Macro, MacroActionType } from '$entities/keys'

import { type MacroKeyStepType, type MacroStep, MacroStepType } from '../model/types'

export function convertActionType (type: MacroActionType): MacroKeyStepType {
  switch (type) {
    case MacroActionType.KeyDown:
      return MacroStepType.KeyDown
    case MacroActionType.KeyUp:
      return MacroStepType.KeyUp
  }
}

export function macroToSteps (macro: Macro): MacroStep[] {
  const steps: MacroStep[] = []
  for (const action of macro.actions) {
    steps.push({
      type: convertActionType(action.type),
      keyName: action.key
    })
    if (action.delay) {
      steps.push({
        type: MacroStepType.Wait,
        delay: action.delay
      })
    }
  }
  return steps
}

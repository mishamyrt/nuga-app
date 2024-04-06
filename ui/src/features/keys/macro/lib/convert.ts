import { getUniqueId } from '@naco-ui/svelte'

import { type Macro, type MacroAction, MacroActionType } from '$entities/keys'

import { type MacroKeyStepType, type MacroStep, MacroStepType } from '../model'

export function actionToStepType (type: MacroActionType): MacroKeyStepType {
  switch (type) {
    case MacroActionType.KeyDown:
      return MacroStepType.KeyDown
    case MacroActionType.KeyUp:
      return MacroStepType.KeyUp
    default:
      throw new Error('Unknown action type')
  }
}

export function stepToActionType (type: MacroKeyStepType): MacroActionType {
  switch (type) {
    case MacroStepType.KeyDown:
      return MacroActionType.KeyDown
    case MacroStepType.KeyUp:
      return MacroActionType.KeyUp
    default:
      throw new Error('Unknown step type')
  }
}

export function macroToSteps (macro: Macro): MacroStep[] {
  const steps: MacroStep[] = []
  for (const action of macro.actions) {
    steps.push({
      id: getUniqueId(),
      type: actionToStepType(action.type),
      keyName: action.key
    })
    if (action.delay) {
      steps.push({
        id: getUniqueId(),
        type: MacroStepType.Wait,
        delay: action.delay
      })
    }
  }
  return steps
}

export function stepsToActions (steps: MacroStep[]): MacroAction[] {
  const macro: MacroAction[] = []
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    if (step.type === MacroStepType.KeyDown || step.type === MacroStepType.KeyUp) {
      let delay = 0
      if (i < steps.length - 1 && steps[i + 1].type === MacroStepType.Wait) {
        delay = steps[i + 1].delay ?? 0
        i++
      }
      macro.push({
        key: step.keyName,
        type: stepToActionType(step.type),
        delay
      })
    } else {
      throw new Error(
        'Incorrect step order: A Wait step cannot directly follow another Wait step without an intervening KeyUp or KeyDown step.'
      )
    }
  }
  return macro
}

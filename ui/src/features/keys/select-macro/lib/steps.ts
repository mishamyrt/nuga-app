import { getUniqueId } from '@naco-ui/svelte'

import { type Macro, type MacroAction, MacroActionType } from '$entities/keys'

import type { MacroKeyStepType, MacroStep } from '../model/types'
import { MacroStepType } from '../model/types'

export function convertActionType (type: MacroActionType): MacroKeyStepType {
  switch (type) {
    case MacroActionType.KeyDown:
      return MacroStepType.KeyDown
    case MacroActionType.KeyUp:
      return MacroStepType.KeyUp
  }
}

export function convertStepType (type: MacroKeyStepType): MacroActionType {
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
      type: convertActionType(action.type),
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
  const simplifiedSteps = simplifyStepsDelay(steps)
  for (let i = 0; i < simplifiedSteps.length; i++) {
    const step = simplifiedSteps[i]
    if (step.type === MacroStepType.KeyDown || step.type === MacroStepType.KeyUp) {
      let delay = 0
      if (i < simplifiedSteps.length - 1 && simplifiedSteps[i + 1].type === MacroStepType.Wait) {
        delay = simplifiedSteps[i + 1].delay ?? 0
        i++
      }
      macro.push({
        key: step.keyName,
        type: convertStepType(step.type),
        delay
      })
    } else {
      throw new Error('Incorrect step order')
    }
  }
  return macro
}

function simplifyStepsDelay (steps: MacroStep[]): MacroStep[] {
  let sumDelay = 0
  const result: MacroStep[] = []
  for (const step of steps) {
    if (step.type === MacroStepType.Wait) {
      sumDelay += step.delay
    } else {
      if (sumDelay > 0) {
        result.push({
          id: step.id,
          type: MacroStepType.Wait,
          delay: sumDelay
        })
        sumDelay = 0
      }
      result.push(step)
    }
  }
  if (sumDelay) {
    result.push({
      id: getUniqueId(),
      type: MacroStepType.Wait,
      delay: sumDelay
    })
  }
  return result
}

export function checkMacroStepsOrder (steps: MacroStep[]): boolean {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    let pairIndex: number
    switch (step.type) {
      case MacroStepType.KeyDown:
        pairIndex = findStepIndexToBottom(steps, step.keyName, i)
        if (pairIndex === -1 || steps[pairIndex].type === MacroStepType.KeyDown) {
          return false
        }
        break
      case MacroStepType.KeyUp:
        pairIndex = findStepIndexToTop(steps, step.keyName, i)
        if (pairIndex === -1 || steps[pairIndex].type === MacroStepType.KeyUp) {
          return false
        }
        break
      case MacroStepType.Wait:
        if (i === 0) {
          return false
        }
        break
    }
  }
  return true
}

export function findStepIndexToTop (steps: MacroStep[], keyName: string, startIndex: number): number {
  for (let i = startIndex - 1; i >= 0; i--) {
    if (steps[i].keyName === keyName) {
      return i
    }
  }
  return -1
}

export function findStepIndexToBottom (steps: MacroStep[], keyName: string, startIndex: number): number {
  for (let i = startIndex + 1; i < steps.length; i++) {
    if (steps[i].keyName === keyName) {
      return i
    }
  }
  return -1
}

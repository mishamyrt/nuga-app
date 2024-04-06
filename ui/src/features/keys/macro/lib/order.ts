import type { MacroStep } from '../model/types'
import { MacroStepType } from '../model/types'

export function findStepIndexToTop (
  steps: MacroStep[],
  keyName: string,
  startIndex: number
): number {
  for (let i = startIndex - 1; i >= 0; i--) {
    if (steps[i].keyName === keyName) {
      return i
    }
  }
  return -1
}

export function findStepIndexToBottom (
  steps: MacroStep[],
  keyName: string,
  startIndex: number
): number {
  for (let i = startIndex + 1; i < steps.length; i++) {
    if (steps[i].keyName === keyName) {
      return i
    }
  }
  return -1
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

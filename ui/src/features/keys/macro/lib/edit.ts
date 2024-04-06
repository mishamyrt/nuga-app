import { type MacroStep, MacroStepType } from '../model'
import { findStepIndexToBottom, findStepIndexToTop } from './order'

export function updateDelay (steps: MacroStep[], id: string, delay: number): MacroStep[] {
  return steps.map(step => {
    if (step.id === id) {
      return {
        ...step,
        delay
      }
    }
    return step
  })
}

export function updateKeystroke (
  steps: MacroStep[],
  id: string,
  keyName: string
): MacroStep[] {
  const itemIndex = steps.findIndex(step => step.id === id)
  if (itemIndex === -1) {
    throw new Error(`Step ${id} not found`)
  }
  const changedItem = steps[itemIndex]
  let pairIndex: number = -1
  switch (changedItem.type) {
    case MacroStepType.KeyDown:
      pairIndex = findStepIndexToBottom(steps, keyName, itemIndex)
      break
    case MacroStepType.KeyUp:
      pairIndex = findStepIndexToTop(steps, keyName, itemIndex)
      break
    default:
      throw new Error('Incorrect step type')
  }
  if (pairIndex === -1) {
    throw new Error(`Step pair for ${keyName} not found`)
  }
  return steps.map((step, i) => {
    if (i === itemIndex || i === pairIndex) {
      return {
        ...step,
        keyName
      }
    }
    return step
  })
}

export function removeStep (steps: MacroStep[], id: string): MacroStep[] {
  const index = steps.findIndex(step => step.id === id)
  if (index === -1) {
    throw new Error(`Step ${id} not found`)
  }
  const step = steps[index]
  if (step.type === MacroStepType.Wait) {
    return steps.filter((_, i) => i !== index && i !== index + 1)
  }
  let pairIndex: number
  if (step.type === MacroStepType.KeyDown) {
    pairIndex = findStepIndexToBottom(steps, step.keyName, index)
  } else {
    pairIndex = findStepIndexToTop(steps, step.keyName, index)
  }
  if (index === 0 || pairIndex === 0) {
    const filtered = steps.filter((_, i) => i !== index && i !== pairIndex)
    const startOffset = filtered.findIndex(step => step.type !== MacroStepType.Wait)
    return filtered.slice(startOffset)
  }

  return steps.filter((_, i) => i !== index && i !== pairIndex)
}

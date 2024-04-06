import { describe, expect, it } from 'vitest'

import { type MacroStep, MacroStepType } from '../../model'
import { checkMacroStepsOrder, findStepIndexToBottom, findStepIndexToTop } from '../order'

const exampleSteps: MacroStep[] = [
  { id: '1', type: MacroStepType.KeyDown, keyName: 'x' },
  { id: '2', type: MacroStepType.Wait, delay: 100 },
  { id: '3', type: MacroStepType.KeyUp, keyName: 'x' },
  { id: '4', type: MacroStepType.KeyDown, keyName: 'y' },
  { id: '5', type: MacroStepType.KeyUp, keyName: 'y' },
  { id: '6', type: MacroStepType.Wait, delay: 200 },
  { id: '7', type: MacroStepType.KeyDown, keyName: 'z' }
]

describe('findStepIndexToTop', () => {
  it('should return the correct index of the keyName from the top', () => {
    expect(findStepIndexToTop(exampleSteps, 'y', 5)).toBe(4)
  })

  it('should return -1 if keyName is not found in the steps array', () => {
    expect(findStepIndexToTop(exampleSteps, 'a', 5)).toBe(-1)
  })

  it('should return the correct index if keyName is found at the beginning', () => {
    expect(findStepIndexToTop(exampleSteps, 'x', 2)).toBe(0)
  })
})

describe('findStepIndexToBottom', () => {
  it('should return the correct index of the keyName from the bottom', () => {
    expect(findStepIndexToBottom(exampleSteps, 'x', 0)).toBe(2)
  })

  it('should return -1 if keyName is not found in the steps array', () => {
    expect(findStepIndexToBottom(exampleSteps, 'y', 4)).toBe(-1)
  })

  it('should return the correct index if keyName is found at the end', () => {
    expect(findStepIndexToBottom(exampleSteps, 'z', 3)).toBe(6)
  })
})

describe('checkMacroStepsOrder', () => {
  it('correctly handles order of KeyDown and KeyUp steps', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.KeyUp, keyName: 'a' }
    ]
    expect(checkMacroStepsOrder(steps)).toBe(true)
  })

  it('correctly handles Wait steps at the beginning', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.Wait, delay: 100 },
      { id: '2', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '3', type: MacroStepType.KeyUp, keyName: 'a' }
    ]
    expect(checkMacroStepsOrder(steps)).toBe(false)
  })

  it('correctly handles of missing pairs of KeyDown and KeyUp steps', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.KeyUp, keyName: 'a' },
      { id: '3', type: MacroStepType.KeyDown, keyName: 'b' }
    ]
    expect(checkMacroStepsOrder(steps)).toBe(false)
  })
})

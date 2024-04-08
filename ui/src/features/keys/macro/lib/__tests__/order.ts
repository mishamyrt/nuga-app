import { describe, expect, it } from 'vitest'

import { type MacroStep, MacroStepType } from '../../model'
import {
  checkMacroStepsOrder,
  findStepIndexToBottom,
  findStepIndexToTop,
} from '../order'

const exampleSteps: MacroStep[] = [
  { id: '1', type: MacroStepType.KeyDown, keyName: 'x' },
  { id: '2', type: MacroStepType.Wait, delay: 100 },
  { id: '3', type: MacroStepType.KeyUp, keyName: 'x' },
  { id: '4', type: MacroStepType.KeyDown, keyName: 'y' },
  { id: '5', type: MacroStepType.KeyUp, keyName: 'y' },
  { id: '6', type: MacroStepType.Wait, delay: 200 },
  { id: '7', type: MacroStepType.KeyDown, keyName: 'z' },
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

  it('should return the correct index of the matching step above the start index', () => {
    const steps: MacroStep[] = [
      { id: '1', keyName: 'a', type: MacroStepType.KeyDown },
      { id: '2', keyName: 'b', type: MacroStepType.KeyDown },
      { id: '3', keyName: 'a', type: MacroStepType.KeyUp },
    ]
    expect(findStepIndexToTop(steps, 'a', 2)).toEqual(0)
  })

  it('should return -1 if no matching step is found above the start index', () => {
    const steps: MacroStep[] = [
      { id: '1', keyName: 'a', type: MacroStepType.KeyDown },
    ]
    expect(findStepIndexToTop(steps, 'b', 1)).toEqual(-1)
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

  it('should return the correct index of the matching step below the start index', () => {
    const steps: MacroStep[] = [
      { id: '1', keyName: 'a', type: MacroStepType.KeyDown },
      { id: '2', keyName: 'b', type: MacroStepType.KeyDown },
      { id: '3', keyName: 'a', type: MacroStepType.KeyUp },
    ]
    expect(findStepIndexToBottom(steps, 'b', 0)).toEqual(1)
  })

  it('should return -1 if no matching step is found below the start index', () => {
    const steps: MacroStep[] = [{ id: '1', keyName: 'b', type: MacroStepType.KeyUp }]
    expect(findStepIndexToBottom(steps, 'b', 0)).toEqual(-1)
  })
})

describe('checkMacroStepsOrder', () => {
  it('correctly handles order of KeyDown and KeyUp steps', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.KeyUp, keyName: 'a' },
    ]
    expect(checkMacroStepsOrder(steps)).toBe(true)
  })

  it('correctly handles Wait steps at the beginning', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.Wait, delay: 100 },
      { id: '2', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '3', type: MacroStepType.KeyUp, keyName: 'a' },
    ]
    expect(checkMacroStepsOrder(steps)).toBe(false)
  })

  it('correctly handles of missing pairs of KeyDown and KeyUp steps', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.KeyUp, keyName: 'a' },
      { id: '3', type: MacroStepType.KeyDown, keyName: 'b' },
    ]
    expect(checkMacroStepsOrder(steps)).toBe(false)
  })

  it('handles multiple key presses in sequence', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.KeyDown, keyName: 'b' },
      { id: '3', type: MacroStepType.KeyUp, keyName: 'a' },
      { id: '4', type: MacroStepType.KeyUp, keyName: 'b' },
    ]
    expect(checkMacroStepsOrder(steps)).toBe(true)
  })

  it('handles nested key presses', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.KeyDown, keyName: 'b' },
      { id: '3', type: MacroStepType.KeyUp, keyName: 'b' },
      { id: '4', type: MacroStepType.KeyUp, keyName: 'a' },
    ]
    expect(checkMacroStepsOrder(steps)).toBe(true)
  })

  it('handles multiple Wait steps interspersed between key presses', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.Wait, delay: 100 },
      { id: '3', type: MacroStepType.KeyUp, keyName: 'a' },
      { id: '4', type: MacroStepType.Wait, delay: 200 },
      { id: '5', type: MacroStepType.KeyDown, keyName: 'b' },
      { id: '6', type: MacroStepType.KeyUp, keyName: 'b' },
    ]
    expect(checkMacroStepsOrder(steps)).toBe(true)
  })

  it('detects KeyDown without a corresponding KeyUp', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.KeyDown, keyName: 'b' },
    ]
    expect(checkMacroStepsOrder(steps)).toBe(false)
  })

  it('detects repeated KeyDown steps for the same key without an intervening KeyUp', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.KeyDown, keyName: 'a' },
    ]
    expect(checkMacroStepsOrder(steps)).toBe(false)
  })
})

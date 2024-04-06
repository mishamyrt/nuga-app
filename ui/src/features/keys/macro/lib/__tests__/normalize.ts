import { describe, expect, it } from 'vitest'

import { type MacroStep, MacroStepType } from '../../model'
import { normalizeDelaySteps } from '../normalize'

describe('normalizeDelaySteps', () => {
  it('should return the same steps when there are no Wait steps', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'x' },
      { id: '2', type: MacroStepType.KeyUp, keyName: 'x' }
    ]
    const normalizedSteps = normalizeDelaySteps(steps)
    expect(normalizedSteps).toEqual(steps)
  })

  it('should combine a single Wait step into one', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.Wait, delay: 100 }
    ]
    const normalizedSteps = normalizeDelaySteps(steps)
    expect(normalizedSteps).toEqual(steps)
  })

  it('should combine multiple consecutive Wait steps into one', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.Wait, delay: 100 },
      { id: '2', type: MacroStepType.Wait, delay: 200 }
    ]
    const normalizedSteps = normalizeDelaySteps(steps)
    expect(normalizedSteps).toEqual([
      { id: '2', type: MacroStepType.Wait, delay: 300 }
    ])
  })

  it('should keep Wait steps interspersed with other step types', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'y' },
      { id: '2', type: MacroStepType.Wait, delay: 1300 },
      { id: '3', type: MacroStepType.Wait, delay: 12 },
      { id: '4', type: MacroStepType.KeyUp, keyName: 'y' },
      { id: '5', type: MacroStepType.Wait, delay: 200 }
    ]
    const normalizedSteps = normalizeDelaySteps(steps)
    expect(normalizedSteps).toEqual([
      { id: '1', type: MacroStepType.KeyDown, keyName: 'y' },
      { id: '3', type: MacroStepType.Wait, delay: 1312 },
      { id: '4', type: MacroStepType.KeyUp, keyName: 'y' },
      { id: '5', type: MacroStepType.Wait, delay: 200 }
    ])
  })
})

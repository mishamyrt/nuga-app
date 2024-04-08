import { describe, expect, it } from 'vitest'

import { type Macro, MacroActionType } from '$entities/keys'

import { type MacroStep, MacroStepType } from '../../model'
import {
  actionToStepType,
  macroToSteps,
  stepsToActions,
  stepToActionType,
} from '../convert'

describe('actionToStepType', () => {
  it('should convert MacroActionType.KeyDown to MacroStepType.KeyDown', () => {
    expect(actionToStepType(MacroActionType.KeyDown)).toEqual(MacroStepType.KeyDown)
  })

  it('should convert MacroActionType.KeyUp to MacroStepType.KeyUp', () => {
    expect(actionToStepType(MacroActionType.KeyUp)).toEqual(MacroStepType.KeyUp)
  })

  it('should throw an error for an unknown action type', () => {
    expect(() =>
      actionToStepType('UnknownActionType' as MacroActionType),
    ).toThrowError('Unknown action type')
  })
})

describe('stepToActionType', () => {
  it('should return MacroActionType.KeyDown when type is MacroStepType.KeyDown', () => {
    expect(stepToActionType(MacroStepType.KeyDown)).toEqual(MacroActionType.KeyDown)
  })

  it('should return MacroActionType.KeyUp when type is MacroStepType.KeyUp', () => {
    expect(stepToActionType(MacroStepType.KeyUp)).toEqual(MacroActionType.KeyUp)
  })

  it('should throw an error for an unknown step type', () => {
    const wrongType = 'UnknownStepType' as MacroStepType.KeyDown
    expect(() => stepToActionType(wrongType)).toThrowError('Unknown step type')
  })
})

describe('macroToSteps', () => {
  it('should return an empty array for an empty macro', () => {
    const macro: Macro = {
      title: 'Empty',
      repeats: 0,
      actions: [],
    }
    expect(macroToSteps(macro)).toEqual([])
  })

  it('should correctly convert a macro with one action without delay', () => {
    const macro: Macro = {
      title: 'Single',
      repeats: 1,
      actions: [{ type: MacroActionType.KeyDown, key: 'm' }],
    }
    expect(macroToSteps(macro)).toEqual([
      { id: expect.any(String), type: MacroStepType.KeyDown, keyName: 'm' },
    ])
  })

  it('should correctly convert a macro with one action with delay', () => {
    const macro: Macro = {
      title: 'Delay',
      repeats: 1,
      actions: [{ type: MacroActionType.KeyDown, key: 'm', delay: 100 }],
    }
    expect(macroToSteps(macro)).toEqual([
      { id: expect.any(String), type: MacroStepType.KeyDown, keyName: 'm' },
      { id: expect.any(String), type: MacroStepType.Wait, delay: 100 },
    ])
  })

  it('should correctly convert a macro with multiple actions without delays', () => {
    const macro: Macro = {
      title: 'Multiple',
      repeats: 1,
      actions: [
        { type: MacroActionType.KeyDown, key: 'm' },
        { type: MacroActionType.KeyUp, key: 'm' },
      ],
    }
    expect(macroToSteps(macro)).toEqual([
      { id: expect.any(String), type: MacroStepType.KeyDown, keyName: 'm' },
      { id: expect.any(String), type: MacroStepType.KeyUp, keyName: 'm' },
    ])
  })

  it('should correctly convert a macro with multiple actions with delays', () => {
    const macro: Macro = {
      title: 'Multiple',
      repeats: 1,
      actions: [
        { type: MacroActionType.KeyDown, key: 'm', delay: 100 },
        { type: MacroActionType.KeyUp, key: 'm', delay: 200 },
      ],
    }
    expect(macroToSteps(macro)).toEqual([
      { id: expect.any(String), type: MacroStepType.KeyDown, keyName: 'm' },
      { id: expect.any(String), type: MacroStepType.Wait, delay: 100 },
      { id: expect.any(String), type: MacroStepType.KeyUp, keyName: 'm' },
      { id: expect.any(String), type: MacroStepType.Wait, delay: 200 },
    ])
  })
})

describe('stepsToActions', () => {
  it('should return an empty array when input steps array is empty', () => {
    const result = stepsToActions([])
    expect(result).toEqual([])
  })

  it('should return a single MacroAction with type KeyDown', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
    ]
    const result = stepsToActions(steps)
    expect(result).toEqual([{ key: 'a', type: MacroActionType.KeyDown, delay: 0 }])
  })

  it('should return a single MacroAction with type KeyUp', () => {
    const steps: MacroStep[] = [{ id: '2', type: MacroStepType.KeyUp, keyName: 'b' }]
    const result = stepsToActions(steps)
    expect(result).toEqual([{ key: 'b', type: MacroActionType.KeyUp, delay: 0 }])
  })

  it('should return MacroActions for KeyDown and Wait steps', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'a' },
      { id: '2', type: MacroStepType.Wait, delay: 100 },
    ]
    const result = stepsToActions(steps)
    expect(result).toEqual([{ key: 'a', type: MacroActionType.KeyDown, delay: 100 }])
  })

  it('should return MacroActions for KeyUp and Wait steps', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyUp, keyName: 'b' },
      { id: '2', type: MacroStepType.Wait, delay: 200 },
    ]
    const result = stepsToActions(steps)
    expect(result).toEqual([{ key: 'b', type: MacroActionType.KeyUp, delay: 200 }])
  })

  it('should throw an error for incorrect step order', () => {
    const steps: MacroStep[] = [
      { id: '1', type: MacroStepType.KeyDown, keyName: 'b' },
      { id: '2', type: MacroStepType.Wait, delay: 200 },
      { id: '3', type: MacroStepType.Wait, delay: 200 },
      { id: '4', type: MacroStepType.KeyUp, keyName: 'b' },
    ]
    expect(() => stepsToActions(steps)).toThrow('Incorrect step order')
  })
})

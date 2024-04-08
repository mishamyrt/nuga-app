import { describe, expect, it } from 'vitest'

import { MacroActionType } from '$entities/keys'

import { paramsToMacro } from '../macros'

describe('paramsToMacro', () => {
  it('should map title from params to Macro object', () => {
    const params = { index: 0, title: 'Test Title', repeats: 3, actions: [] }
    const result = paramsToMacro(params)
    expect(result.title).toBe('Test Title')
  })

  it('should map repeats from params to Macro object', () => {
    const params = { index: 0, title: 'Test Title', repeats: 3, actions: [] }
    const result = paramsToMacro(params)
    expect(result.repeats).toBe(3)
  })

  it('should map actions from params to Macro object', () => {
    const actions = [
      { key: 'A', type: MacroActionType.KeyDown },
      { key: 'B', type: MacroActionType.KeyUp },
    ]
    const params = { index: 0, title: 'Test Title', repeats: 3, actions }
    const result = paramsToMacro(params)
    expect(result.actions).toEqual(actions)
  })
})

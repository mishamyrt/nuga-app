import { describe, expect, it } from 'vitest'

import { KeyActionType } from '$entities/keys'

import { isSameAction } from '../action'

describe('isSameAction', () => {
  it('should return true for equal actions', () => {
    expect(isSameAction({
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'k',
        modifiers: {
          ctrl: true,
          shift: false,
          alt: true,
          meta: false
        }
      }
    }, {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'k',
        modifiers: {
          ctrl: true,
          shift: false,
          alt: true,
          meta: false
        }
      }
    })).toBe(true)
  })

  it('should return false when modifiers differ', () => {
    expect(isSameAction({
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'k',
        modifiers: {
          ctrl: true,
          shift: false,
          alt: false,
          meta: false
        }
      }
    }, {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'k',
        modifiers: {
          ctrl: false,
          shift: false,
          alt: false,
          meta: false
        }
      }
    })).toBe(false)
  })

  it('should return false when key differs', () => {
    expect(isSameAction({
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'k',
        modifiers: {
          ctrl: true,
          shift: false,
          alt: false,
          meta: false
        }
      }
    }, {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'j',
        modifiers: {
          ctrl: true,
          shift: false,
          alt: false,
          meta: false
        }
      }
    })).toBe(false)
  })

  it('should return false when one of modifiers is undefined', () => {
    expect(isSameAction({
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'k',
        modifiers: {
          ctrl: true,
          shift: false,
          alt: false,
          meta: false
        }
      }
    }, {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'fn'
      }
    })
    ).toBe(false)
  })
})

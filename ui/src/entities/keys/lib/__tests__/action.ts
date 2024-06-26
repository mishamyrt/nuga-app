import { describe, expect, it } from 'vitest'

import { type KeyAction, KeyActionType } from '$entities/keys'

import {
  isModifierAction,
  isSameAction,
  isStrictKeystroke,
  safeKeystrokeAction,
} from '../action'

describe('isSameAction', () => {
  it('should return true for equal actions', () => {
    expect(
      isSameAction(
        {
          type: KeyActionType.Keystroke,
          keystroke: {
            key: 'k',
            modifiers: {
              ctrl: true,
              shift: false,
              alt: true,
              meta: false,
            },
          },
        },
        {
          type: KeyActionType.Keystroke,
          keystroke: {
            key: 'k',
            modifiers: {
              ctrl: true,
              shift: false,
              alt: true,
              meta: false,
            },
          },
        },
      ),
    ).toBe(true)
  })

  it('should return false when modifiers differ', () => {
    expect(
      isSameAction(
        {
          type: KeyActionType.Keystroke,
          keystroke: {
            key: 'k',
            modifiers: {
              ctrl: true,
              shift: false,
              alt: false,
              meta: false,
            },
          },
        },
        {
          type: KeyActionType.Keystroke,
          keystroke: {
            key: 'k',
            modifiers: {
              ctrl: false,
              shift: false,
              alt: false,
              meta: false,
            },
          },
        },
      ),
    ).toBe(false)
  })

  it('should return false when key differs', () => {
    expect(
      isSameAction(
        {
          type: KeyActionType.Keystroke,
          keystroke: {
            key: 'k',
            modifiers: {
              ctrl: true,
              shift: false,
              alt: false,
              meta: false,
            },
          },
        },
        {
          type: KeyActionType.Keystroke,
          keystroke: {
            key: 'j',
            modifiers: {
              ctrl: true,
              shift: false,
              alt: false,
              meta: false,
            },
          },
        },
      ),
    ).toBe(false)
  })

  it('should return false when one of modifiers is undefined', () => {
    expect(
      isSameAction(
        {
          type: KeyActionType.Keystroke,
          keystroke: {
            key: 'k',
            modifiers: {
              ctrl: true,
              shift: false,
              alt: false,
              meta: false,
            },
          },
        },
        {
          type: KeyActionType.Keystroke,
          keystroke: {
            key: 'fn',
          },
        },
      ),
    ).toBe(false)
  })
})

describe('isModifierAction', () => {
  it('should return true for ctrl key', () => {
    const action: KeyAction = {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'lctrl',
        modifiers: {
          ctrl: true,
          shift: false,
          alt: false,
          meta: false,
        },
      },
    }
    expect(isModifierAction(action)).toBe(true)
    action.keystroke.key = 'rctrl'
    expect(isModifierAction(action)).toBe(true)
  })

  it('should return true for shift key', () => {
    const action: KeyAction = {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'lshift',
        modifiers: {
          ctrl: false,
          shift: true,
          alt: false,
          meta: false,
        },
      },
    }
    expect(isModifierAction(action)).toBe(true)
    action.keystroke.key = 'rshift'
    expect(isModifierAction(action)).toBe(true)
  })

  it('should return true for alt key', () => {
    const action: KeyAction = {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'lalt',
        modifiers: {
          ctrl: false,
          shift: false,
          alt: true,
          meta: false,
        },
      },
    }
    expect(isModifierAction(action)).toBe(true)
    action.keystroke.key = 'ralt'
    expect(isModifierAction(action)).toBe(true)
  })

  it('should return true for meta key', () => {
    const action: KeyAction = {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'lmeta',
        modifiers: {
          ctrl: false,
          shift: false,
          alt: false,
          meta: true,
        },
      },
    }
    expect(isModifierAction(action)).toBe(true)
    action.keystroke.key = 'rmeta'
    expect(isModifierAction(action)).toBe(true)
  })

  it('should return false for non modifier actions', () => {
    expect(
      isModifierAction({
        type: KeyActionType.Keystroke,
        keystroke: {
          key: 'k',
          modifiers: {
            ctrl: false,
            shift: false,
            alt: false,
            meta: false,
          },
        },
      }),
    ).toBe(false)
  })

  it('should return false for non keystroke actions', () => {
    expect(
      isModifierAction({
        type: KeyActionType.Macro,
        macro: 0,
      }),
    ).toBe(false)
  })
})

describe('isStrictKeystroke', () => {
  it('should return false for non keystroke actions', () => {
    expect(
      isStrictKeystroke({
        type: KeyActionType.Macro,
        macro: 0,
      }),
    ).toBe(false)
  })

  it('should return true for keystroke actions', () => {
    expect(
      isStrictKeystroke({
        type: KeyActionType.Keystroke,
        keystroke: {
          key: 'k',
          modifiers: {
            ctrl: false,
            shift: false,
            alt: false,
            meta: false,
          },
        },
      }),
    ).toBe(true)
  })

  it('should return false for keystroke actions without modifiers', () => {
    expect(
      isStrictKeystroke({
        type: KeyActionType.Keystroke,
        keystroke: {
          key: 'k',
        },
      }),
    ).toBe(false)
  })

  it('should return false for non keystroke actions', () => {
    expect(
      isStrictKeystroke({
        type: KeyActionType.None,
      }),
    ).toBe(false)
  })
})

describe('safeKeystrokeAction', () => {
  it('should return keystroke action', () => {
    const action: KeyAction = {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'k',
        modifiers: {
          ctrl: false,
          shift: false,
          alt: false,
          meta: false,
        },
      },
    }
    expect(safeKeystrokeAction(action)).toEqual(action)
  })

  it('should return macro action', () => {
    const action: KeyAction = {
      type: KeyActionType.Macro,
      macro: 0,
    }
    expect(safeKeystrokeAction(action)).toEqual({
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'none',
        modifiers: {
          ctrl: false,
          shift: false,
          alt: false,
          meta: false,
        },
      },
    })
  })

  it('should return none action', () => {
    const action: KeyAction = {
      type: KeyActionType.None,
    }
    expect(safeKeystrokeAction(action)).toEqual({
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'none',
        modifiers: {
          ctrl: false,
          shift: false,
          alt: false,
          meta: false,
        },
      },
    })
  })
})

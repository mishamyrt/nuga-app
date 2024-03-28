import { describe, expect, it } from 'vitest'

import { isSameAction } from '../action'

describe('isSameAction', () => {
  it('should return true for equal actions', () => {
    expect(isSameAction({
      key: 'k',
      modifiers: {
        ctrl: true,
        shift: false,
        alt: true,
        meta: false
      }
    }, {
      key: 'k',
      modifiers: {
        ctrl: true,
        shift: false,
        alt: true,
        meta: false
      }
    })).toBe(true)
  })

  it('should return false when modifiers differ', () => {
    expect(isSameAction({
      key: 'k',
      modifiers: {
        ctrl: true,
        shift: false,
        alt: false,
        meta: false
      }
    }, {
      key: 'k',
      modifiers: {
        ctrl: false,
        shift: false,
        alt: false,
        meta: false
      }
    })).toBe(false)
  })

  it('should return false when key differs', () => {
    expect(isSameAction({
      key: 'k',
      modifiers: {
        ctrl: true,
        shift: false,
        alt: false,
        meta: false
      }
    }, {
      key: 'j',
      modifiers: {
        ctrl: true,
        shift: false,
        alt: false,
        meta: false
      }
    })).toBe(false)
  })

  it('should return false when one of modifiers is undefined', () => {
    expect(isSameAction({
      key: 'k',
      modifiers: {
        ctrl: true,
        shift: false,
        alt: false,
        meta: false
      }
    }, { key: 'fn' })
    ).toBe(false)
  })
})

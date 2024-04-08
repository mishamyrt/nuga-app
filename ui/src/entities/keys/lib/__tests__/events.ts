import { describe, expect, it } from 'vitest'

import { keyNameFromEvent, keystrokeFromEvent } from '../events'

describe('keyNameFromEvent', () => {
  it('should return the correct key name when a prefix match is found', () => {
    const mockEvent = new KeyboardEvent('keydown', { code: 'KeyA' })
    expect(keyNameFromEvent(mockEvent)).toEqual('a')
  })

  it('should return the key in lowercase when in keysWithSameName', () => {
    const mockEvent = new KeyboardEvent('keydown', { code: 'Space' })
    expect(keyNameFromEvent(mockEvent)).toEqual('space')
  })

  it('should return the replacement key name when a replacement exists', () => {
    const mockEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' })
    expect(keyNameFromEvent(mockEvent)).toEqual('up')
  })

  it('should return "none" for key events that do not match any condition', () => {
    const mockEvent = new KeyboardEvent('keydown', { code: 'UnknownKey' })
    expect(keyNameFromEvent(mockEvent)).toEqual('none')
  })
})

describe('keystrokeFromEvent', () => {
  it('should return the correct keystroke action', () => {
    const mockEvent = new KeyboardEvent('keydown', { code: 'KeyA' })
    expect(keystrokeFromEvent(mockEvent)).toEqual({
      type: 'keystroke',
      keystroke: {
        key: 'a',
        modifiers: {
          ctrl: false,
          shift: false,
          alt: false,
          meta: false,
        },
      },
    })
  })

  it('should return the correct keystroke action with modifiers', () => {
    const mockEvent = new KeyboardEvent('keydown', {
      code: 'KeyA',
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      metaKey: true,
    })
    expect(keystrokeFromEvent(mockEvent)).toEqual({
      type: 'keystroke',
      keystroke: {
        key: 'a',
        modifiers: {
          ctrl: true,
          shift: true,
          alt: true,
          meta: true,
        },
      },
    })
  })
})

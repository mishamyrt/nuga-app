import { type KeyAction, KeyActionType, type KeystrokeAction } from '$entities/keys'

import { keyNameReplacements, keyPrefixReplacements, keysWithSameName } from './constants'

function keyNameFromEvent (e: KeyboardEvent): string {
  for (const [prefix, replacement] of Object.entries(keyPrefixReplacements)) {
    if (e.code.startsWith(prefix)) {
      return replacement + e.code.slice(prefix.length).toLowerCase()
    }
  }
  if (keysWithSameName.includes(e.code)) {
    return e.code.toLowerCase()
  }
  if (keyNameReplacements[e.code]) {
    return keyNameReplacements[e.code]
  }

  return 'none'
}

export function keystrokeFromEvent (e: KeyboardEvent): KeystrokeAction {
  return {
    type: KeyActionType.Keystroke,
    keystroke: {
      key: keyNameFromEvent(e),
      modifiers: {
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey,
        meta: e.metaKey
      }
    }
  }
}

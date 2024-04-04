import { type KeyAction, KeyActionType, type KeystrokeAction } from '$entities/keys'

export const defaultAction: KeyAction = {
  type: KeyActionType.None
}

export const defaultKeystroke: KeystrokeAction = {
  type: KeyActionType.Keystroke,
  keystroke: {
    key: 'none',
    modifiers: {
      ctrl: false,
      shift: false,
      alt: false,
      meta: false
    }
  }
}

export const keyPrefixReplacements: Record<string, string> = {
  Key: '',
  Digit: 'num'
}

export const keyNameReplacements: Record<string, string> = {
  BracketLeft: 'lbracket',
  BracketRight: 'rbracket'
}

export const keysWithSameName = [
  'Space',
  'Enter',
  'Delete',
  'End',
  'Backslash',
  'Backspace',
  'Slash',
  'Comma',
  'CapsLock',
  'Semicolon',
  'Quote'
]

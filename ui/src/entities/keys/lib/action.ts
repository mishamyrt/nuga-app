import { type KeyAction, KeyActionType, type StrictKeystrokeAction } from '../model/types'
import { modifierKeys } from './constants'

export function isSameAction (a: KeyAction, b: KeyAction): boolean {
  if (a.type !== b.type) {
    return false
  }
  if (a.type === KeyActionType.Keystroke && b.type === KeyActionType.Keystroke) {
    let isModifiersDiffers = false
    const aModifiers = a.keystroke.modifiers
    const bModifiers = b.keystroke.modifiers
    if (Boolean(aModifiers) !== Boolean(bModifiers)) {
      return false
    }
    if (aModifiers && bModifiers) {
      isModifiersDiffers = !(
        aModifiers.ctrl === bModifiers.ctrl &&
          aModifiers.shift === bModifiers.shift &&
          aModifiers.alt === bModifiers.alt &&
          aModifiers.meta === bModifiers.meta
      )
    }
    return a.keystroke.key === b.keystroke.key && !isModifiersDiffers
  }
  if (a.type === KeyActionType.Macro && b.type === KeyActionType.Macro) {
    return a.macro === b.macro
  }
  if (a.type === KeyActionType.None && b.type === KeyActionType.None) {
    return true
  }
  return false
}

export function isModifierAction (action: KeyAction): boolean {
  if (action.type !== KeyActionType.Keystroke) {
    return false
  }
  return modifierKeys.has(action.keystroke.key)
}

export function isStrictKeystroke (x: KeyAction): x is StrictKeystrokeAction {
  if (x.type !== KeyActionType.Keystroke) {
    return false
  }
  return Boolean(x.keystroke?.modifiers)
}

export function safeKeystrokeAction (action: KeyAction): StrictKeystrokeAction {
  const defaultModifiers = {
    ctrl: false,
    shift: false,
    alt: false,
    meta: false
  }
  if (action.type !== KeyActionType.Keystroke) {
    return {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: 'none',
        modifiers: defaultModifiers
      }
    }
  } else if (!isStrictKeystroke(action)) {
    return {
      type: KeyActionType.Keystroke,
      keystroke: {
        key: action.keystroke.key,
        modifiers: defaultModifiers
      }
    }
  }
  return action
}

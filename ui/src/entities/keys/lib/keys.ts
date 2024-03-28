import type { KeyAction } from '..'
import { shortKeyNames } from './constants'

const prefixes = ['numpad', 'num_', 'num']

export function getShortName (key: string): string {
  if (shortKeyNames[key]) {
    return shortKeyNames[key]
  }
  for (const prefix of prefixes) {
    if (key.startsWith(prefix)) {
      return key.slice(prefix.length)
    }
  }
  if (key.length <= 3) {
    return key.toUpperCase()
  }
  return ''
}

export function isSameAction (a: KeyAction, b: KeyAction): boolean {
  let isModifiersDiffers = false
  if ((a.modifiers && !b.modifiers) || (!a.modifiers && b.modifiers)) {
    return false
  } else if (a.modifiers && b.modifiers) {
    isModifiersDiffers = !(
      a.modifiers.ctrl === b.modifiers.ctrl &&
      a.modifiers.shift === b.modifiers.shift &&
      a.modifiers.alt === b.modifiers.alt &&
      a.modifiers.meta === b.modifiers.meta
    )
  }
  return a.key === b.key && !isModifiersDiffers
}

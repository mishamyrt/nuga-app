import type { KeyAction } from '../model/types'

export function isSameAction (a: KeyAction, b: KeyAction): boolean {
  let isModifiersDiffers = false
  if (Boolean(a.modifiers) !== Boolean(b.modifiers)) {
    return false
  }
  if (a.modifiers && b.modifiers) {
    isModifiersDiffers = !(
      a.modifiers.ctrl === b.modifiers.ctrl &&
      a.modifiers.shift === b.modifiers.shift &&
      a.modifiers.alt === b.modifiers.alt &&
      a.modifiers.meta === b.modifiers.meta
    )
  }
  return a.key === b.key && !isModifiersDiffers
}

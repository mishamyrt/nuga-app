import type { KeyAction } from '../model/types'

export function isSameAction (a: KeyAction, b: KeyAction): boolean {
  let isModifiersDiffers = false
  // NOTE: False positive
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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

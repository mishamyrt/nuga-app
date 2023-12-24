import { Halo65, Halo75, Halo96 } from './layouts'
import type { KeyboardLayout, KeyboardTemplate } from './types'

export const supportedKeyboards: Record<string, KeyboardLayout> = {
  Halo75,
  Halo65,
  Halo96
}

export const defaultTemplate: KeyboardTemplate = {
  columns: 0,
  keys: []
}

import type { KeyAction, KeyboardLayout, KeyboardTemplate } from '../model/types'
import { Halo65, Halo75, Halo96 } from './layouts'

export const supportedKeyboards: Record<string, KeyboardLayout> = {
  Halo75,
  Halo65,
  Halo96
} as const

export const defaultTemplate: Readonly<KeyboardTemplate> = {
  columns: 0,
  keys: []
}

export const defaultKeyAction: KeyAction = {
  key: 'none',
  modifiers: {
    ctrl: false,
    shift: false,
    alt: false,
    meta: false
  }
}

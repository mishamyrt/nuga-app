import type { Modifiers } from './key'

export const enum KeyActionType {
  None = 'none',
  Macro = 'macro',
  Keystroke = 'keystroke'
}

export type KeyAction = KeystrokeAction | MacroKeyAction | NoneKeyAction

type BaseAction = {
  type: KeyActionType
}

export type NoneKeyAction = {
  type: KeyActionType.None
} & BaseAction

export type MacroKeyAction = {
  type: KeyActionType.Macro
  macro: number
} & BaseAction

export type KeystrokeParams = {
  key: string
  modifiers?: Modifiers
}

export type StrictKeystrokeParams = {
  modifiers: Modifiers
} & KeystrokeParams

export type KeystrokeAction = {
  type: KeyActionType.Keystroke
  keystroke: KeystrokeParams
  macro?: never // Ensures that macroIndex cannot be present when type is 'Keystroke'
} & BaseAction

export type StrictKeystrokeAction = {
  keystroke: StrictKeystrokeParams
} & KeystrokeAction

export type ActionChangeParams = {
  key: string
  action: KeyAction
}

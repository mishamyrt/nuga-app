import type { ComponentType, SvelteComponent } from 'svelte'

export type Key = {
  code: string | 'spacer'
  secondaryCode?: string
  color: 'light' | 'dark' | 'orange' | 'yellow' | 'mint'
  width: number
  height: number
  readonly: boolean
}

export type KeyDescription = Partial<Key>

export type KeyboardLayout = KeyDescription[][]

export type KeyboardTemplate = {
  keys: Key[][]
  columns: number
}

export type KeyOption = {
  title: string
  value: string
}

export type KeyGroup = {
  title: string
  keys: KeyOption[]
}

export type Modifiers = {
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
}

export const enum KeyActionType {
  None = 'none',
  Macro = 'macro',
  Keystroke = 'keystroke'
}

export type KeystrokeParams = {
  key: string
  modifiers?: Modifiers
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
  macroIndex: number
} & BaseAction

export type KeystrokeAction = {
  type: KeyActionType.Keystroke
  keystroke: KeystrokeParams
  macroIndex?: never // Ensures that macroIndex cannot be present when type is 'Keystroke'
} & BaseAction

export type KeyMap = Record<string, KeyAction>

export type KeyChangesMap = Record<string, boolean>

export type KeyNames = Record<string, string>

export type KeyComponentProps = {
  key: Key
  location: [number, number]
  params?: Record<string, any>
}

export type KeyComponentType = ComponentType<SvelteComponent<KeyComponentProps>>

export type ActionChangeParams = {
  key: string
  action: KeyAction
}

export const enum MacroActionType {
  KeyDown = 'down',
  KeyUp = 'up',
}

export type MacroAction = {
  key: string
  type: MacroActionType
  delay?: number
}

export type Macro = {
  actions: MacroAction[]
  repeats: number
  title: string
}

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

export type KeyAction = {
  key: string
  modifiers: Modifiers
}

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

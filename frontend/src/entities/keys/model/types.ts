import type { ComponentType, SvelteComponent } from 'svelte'

export interface Key {
  code: string | 'spacer'
  color: 'light' | 'dark' | 'orange' | 'yellow' | 'mint'
  width: number
  height: number
}

export type KeyDescription = Partial<Key>

export type KeyboardLayout = KeyDescription[][]

export interface KeyboardTemplate {
  keys: Key[][]
  columns: number
}

export interface KeyOption {
  title: string
  value: string
}

export interface KeyGroup {
  title: string
  keys: KeyOption[]
}

export interface Modifiers {
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
}

export interface KeyAction {
  key: string
  modifiers: Modifiers
}

export type KeyMap = Record<string, KeyAction>

export type KeyNames = Record<string, string>

export interface KeyComponentProps {
  key: Key
  location: [number, number]
  params?: Record<string, any>
}

export type KeyComponentType = ComponentType<SvelteComponent<KeyComponentProps>>

import type { Color } from '@stores/lights'

export interface Key {
  code: string | 'spacer'
  color: 'light' | 'dark' | 'orange' | 'yellow' | 'mint'
  width: number
  height: number
}

export type KeyDescription = Partial<Key>

export type KeyboardLayout = KeyDescription[][]

export interface Keyboard {
  layout: KeyboardLayout
  sidelight: boolean
  halolight: boolean
  backlight: boolean
}

export interface KeyboardTemplate {
  keys: Key[][]
  columns: number
}

export type LightMap = Color[][]

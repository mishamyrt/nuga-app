import type { KeyAction } from './action'
import type { Key, KeyDescription } from './key'

export type KeyboardLayout = KeyDescription[][]

export type KeyboardTemplate = {
  keys: Key[][]
  columns: number
}

export type KeyMap = Record<string, KeyAction>


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

export type KeyHighlightMatrix = RGBHexColor[][]

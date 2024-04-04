export type Key = {
  code: string | 'spacer'
  secondaryCode?: string
  color: 'light' | 'dark' | 'orange' | 'yellow' | 'mint'
  width: number
  height: number
  readonly: boolean
}

export type KeyDescription = Partial<Key>

export type Modifiers = {
  ctrl: boolean
  shift: boolean
  alt: boolean
  meta: boolean
}

export type KeyNames = Record<string, string>

export type KeyChangesMap = Record<string, boolean>

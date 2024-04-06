export type KeyOption = {
  title: string
  value: string
}

export type KeyGroup = {
  title: string
  keys: KeyOption[]
}

export type DisplayedKeyGroup = {
  visible: boolean
} & KeyGroup

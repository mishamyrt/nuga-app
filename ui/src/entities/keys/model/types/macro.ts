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

export type MacroChangedParams = {
  index: number
  title: string
  actions: MacroAction[]
  repeats: number
}

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

export const enum MacroStepType {
  Wait = 'Wait',
  KeyDown = 'Key down',
  KeyUp = 'Key up',
}

export type MacroKeyStepType = MacroStepType.KeyDown | MacroStepType.KeyUp

export type MacroBasicStep = {
  type: MacroStepType
  id: string
  keyName?: string
  delay?: number
}

export type MacroWaitStep = {
  type: MacroStepType.Wait
  delay: number
} & MacroBasicStep

export type MacroKeyStep = {
  type: MacroKeyStepType
  keyName: string
} & MacroBasicStep

export type MacroStep = MacroWaitStep | MacroKeyStep

export type MacroChangedParams = {
  index: number
  title: string
  actions: MacroAction[]
  repeats: number
}

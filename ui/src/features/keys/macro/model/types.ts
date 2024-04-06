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

export type CustomDragEvent = CustomEvent<{
  items: MacroStep[]
}>

export type StepKeystrokeChangedParams = {
  id: string
  keyName: string
}

export type StepDelayChangedParams = {
  id: string
  delay: number
}

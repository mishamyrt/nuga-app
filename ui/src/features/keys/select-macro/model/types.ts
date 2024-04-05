import type { MacroStep } from '$entities/keys'

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

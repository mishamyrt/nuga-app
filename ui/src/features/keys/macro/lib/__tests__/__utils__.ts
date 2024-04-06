import { getUniqueId } from '@naco-ui/svelte'

import { type MacroStep, MacroStepType } from '../../model'

export function mockKeyDown (keyName: string): MacroStep {
  return {
    id: getUniqueId(),
    type: MacroStepType.KeyDown,
    keyName
  }
}

export function mockKeyUp (keyName: string): MacroStep {
  return {
    id: getUniqueId(),
    type: MacroStepType.KeyUp,
    keyName
  }
}

export function mockWait (delay: number): MacroStep {
  return {
    id: getUniqueId(),
    type: MacroStepType.Wait,
    delay
  }
}

export function mockPatchStep (step: MacroStep, value: string | number): MacroStep {
  if (step.type === MacroStepType.Wait) {
    return {
      ...step,
      delay: value as number
    }
  } else {
    return {
      ...step,
      keyName: value as string
    }
  }
}

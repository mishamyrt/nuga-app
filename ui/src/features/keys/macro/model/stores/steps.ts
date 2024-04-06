import { getUniqueId } from '@naco-ui/svelte'
import { createEvent, createStore, sample } from 'effector'

import { macrosStore } from '$entities/keys'

import { macroToSteps } from '../../lib'
import { removeStep, updateDelay, updateKeystroke } from '../../lib/edit'
import type {
  MacroKeyStepType,
  MacroStep,
  StepDelayChangedParams,
  StepKeystrokeChangedParams
} from '../types'
import { MacroStepType } from '../types'
import { editedMacroRemoved, macroCreated, macroEdited } from './lifecycle'

export const stepsChanged = createEvent<MacroStep[]>('stepsChanged')
export const stepKeystrokeChanged = createEvent<StepKeystrokeChangedParams>(
  'macroStepKeystrokeChanged'
)
export const stepDelayChanged = createEvent<StepDelayChangedParams>(
  'macroStepActionChanged'
)
export const stepKeystrokeAdded = createEvent('macroKeystrokeAdded')
export const stepDelayAdded = createEvent('macroDelayRemoved')
export const stepRemoved = createEvent<string>('macroStepRemoved')

export const stepsStore = createStore<MacroStep[]>([], {
  name: 'steps'
})

sample({
  clock: macroEdited,
  source: macrosStore,
  target: stepsStore,
  fn: (macros, i) => macroToSteps(macros[i])
})

stepsStore.reset(macroCreated, editedMacroRemoved)
stepsStore.on(stepsChanged, (_, steps) => steps)

stepsStore.on(stepDelayChanged, (steps, { id, delay }) =>
  updateDelay(steps, id, delay)
)
stepsStore.on(stepKeystrokeChanged, (steps, { id, keyName }) =>
  updateKeystroke(steps, id, keyName)
)
stepsStore.on(stepRemoved, (steps, id) =>
  removeStep(steps, id)
)

stepsStore.on(stepDelayAdded, (steps) => [
  ...steps,
  {
    id: getUniqueId(),
    type: MacroStepType.Wait,
    delay: 50
  }
])
stepsStore.on(stepKeystrokeAdded, (steps) => [
  ...steps,
  {
    id: getUniqueId(),
    type: MacroStepType.KeyDown as MacroKeyStepType,
    keyName: 'm'
  },
  {
    id: getUniqueId(),
    type: MacroStepType.KeyUp as MacroKeyStepType,
    keyName: 'm'
  }
])

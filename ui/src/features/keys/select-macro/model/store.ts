import { getUniqueId } from '@naco-ui/svelte'
import { createEvent, createStore, sample } from 'effector'

import { macroChanged, macroRemoved, macrosStore } from '$entities/keys'

import {
  findStepIndexToBottom,
  findStepIndexToTop,
  macroToSteps,
  normalizeDelaySteps,
  stepsToActions
} from '../lib'
import type {
  MacroKeyStepType,
  MacroStep,
  StepDelayChangedParams,
  StepKeystrokeChangedParams
} from './types'
import { MacroStepType } from './types'

export const macroStepsStore = macrosStore.map(macros => macros.map(macroToSteps))

export const macroEdited = createEvent<number>('macroEdited')
export const macroCreated = createEvent('macroCreated')
export const currentMacroRemoved = createEvent('currentMacroRemoved')
export const macroStepKeystrokeChanged = createEvent<StepKeystrokeChangedParams>('macroStepKeystrokeChanged')
export const macroStepDelayChanged = createEvent<StepDelayChangedParams>('macroStepActionChanged')
export const macroStepKeystrokeAdded = createEvent('macroKeystrokeAdded')
export const macroStepDelayAdded = createEvent('macroDelayRemoved')
export const macroStepRemoved = createEvent<string>('macroStepRemoved')

export const macroSubmitted = createEvent('macroSubmitted')
export const modalClosed = createEvent('modalClosed')

export const macroTitleChanged = createEvent<string>('macroTitleChanged')
export const macroRepeatsChanged = createEvent<number>('macroRepeatsChanged')
export const macroStepsChanged = createEvent<MacroStep[]>('macroStepsChanged')

const indexStore = createStore<number>(-1, { name: 'macroIndex' })
export const macroTitleStore = createStore<string>('Macro', { name: 'macroTitle' })
export const macroRepeatsStore = createStore<number>(1, { name: 'macroRepeats' })
export const currentMacroStepsStore = createStore<MacroStep[]>([], { name: 'currentMacroSteps' })
export const showMacroModalStore = createStore<boolean>(false, { name: 'showMacroModal' })

sample({
  clock: currentMacroRemoved,
  source: indexStore,
  target: macroRemoved
})

// Load macros data on edit
sample({
  clock: macroEdited,
  source: macrosStore,
  target: macroTitleStore,
  fn: (macros, i) => macros[i].title
})
sample({
  clock: macroEdited,
  source: macrosStore,
  target: macroRepeatsStore,
  fn: (macros, i) => macros[i].repeats
})
sample({
  clock: macroEdited,
  source: macroStepsStore,
  target: currentMacroStepsStore,
  fn: (macros, i) => macros[i]
})

indexStore.on(macroEdited, (_, index) => index)
indexStore.reset(macroCreated)

// Set clear macro on create
sample({
  clock: macroCreated,
  source: macrosStore,
  fn: macros => `Macro ${macros.length + 1}`,
  target: macroTitleStore
})
currentMacroStepsStore.reset(macroCreated, currentMacroRemoved)
macroRepeatsStore.reset(macroCreated, currentMacroRemoved)

// Update fields value on change
macroTitleStore.on(macroTitleChanged, (_, title) => title)
macroRepeatsStore.on(macroRepeatsChanged, (_, repeats) => repeats)
currentMacroStepsStore.on(macroStepsChanged, (_, steps) => steps)

// Macro modal visibility
showMacroModalStore.on([macroCreated, macroEdited], () => true)
showMacroModalStore.reset(modalClosed)

// Set macro on submit
sample({
  clock: macroSubmitted,
  source: [macroTitleStore, macroRepeatsStore, currentMacroStepsStore, indexStore],
  fn: (source) => {
    const [title, repeats, steps, index] = source as [string, number, MacroStep[], number]
    return {
      title,
      repeats,
      actions: stepsToActions(
        normalizeDelaySteps(steps)
      ),
      index
    }
  },
  target: macroChanged
})

// Update step data on change
currentMacroStepsStore.on(macroStepDelayChanged, (steps, { id, delay }) => {
  return steps.map(step => {
    if (step.id === id) {
      return {
        ...step,
        delay
      }
    }
    return step
  })
})
currentMacroStepsStore.on(macroStepKeystrokeChanged, (steps, { id, keyName }) => {
  const itemIndex = steps.findIndex(step => step.id === id)
  if (itemIndex === -1) {
    throw new Error(`Step ${id} not found`)
  }
  const changedItem = steps[itemIndex]
  let pairIndex: number = -1
  switch (changedItem.type) {
    case MacroStepType.KeyDown:
      for (let i = itemIndex + 1; i < steps.length; i++) {
        if (steps[i].keyName === changedItem.keyName) {
          pairIndex = i
          break
        }
      }
      break
    case MacroStepType.KeyUp:
      for (let i = itemIndex - 1; i >= 0; i--) {
        if (steps[i].keyName === changedItem.keyName) {
          pairIndex = i
          break
        }
      }
      break
    default:
      throw new Error('Incorrect step type')
  }
  return steps.map((step, i) => {
    if (i === itemIndex) {
      return {
        ...step,
        keyName
      }
    }
    if (i === pairIndex) {
      return {
        ...step,
        keyName
      }
    }
    return step
  })
})

// Added macro steps
currentMacroStepsStore.on(macroStepDelayAdded, (steps) => [
  ...steps,
  {
    id: getUniqueId(),
    type: MacroStepType.Wait,
    delay: 50
  }
])
currentMacroStepsStore.on(macroStepKeystrokeAdded, (steps) => [
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

// Removed macro steps
currentMacroStepsStore.on(macroStepRemoved, (steps, id) => {
  const index = steps.findIndex(step => step.id === id)
  if (index === -1) {
    throw new Error(`Step ${id} not found`)
  }
  const step = steps[index]
  if (step.type === MacroStepType.Wait) {
    return steps.filter((_, i) => i !== index && i !== index + 1)
  }
  let pairIndex: number
  if (step.type === MacroStepType.KeyDown) {
    pairIndex = findStepIndexToBottom(steps, step.keyName, index)
  } else {
    pairIndex = findStepIndexToTop(steps, step.keyName, index)
  }
  if (index === 0 || pairIndex === 0) {
    const filtered = steps.filter((_, i) => i !== index && i !== pairIndex)
    const startOffset = filtered.findIndex(step => step.type !== MacroStepType.Wait)
    return filtered.slice(startOffset)
  }

  return steps.filter((_, i) => i !== index && i !== pairIndex)
})
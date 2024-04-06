import { createEvent, createStore, sample } from 'effector'

import { macrosStore } from '$entities/keys'

import { defaultMacroName, defaultMacroRepeats } from '../../lib'
import { editedMacroRemoved, macroCreated, macroEdited } from './lifecycle'

export const macroTitleChanged = createEvent<string>('macroTitleChanged')
export const macroRepeatsChanged = createEvent<number>('macroRepeatsChanged')

export const macroTitleStore = createStore(defaultMacroName, { name: 'macroTitle' })
export const macroRepeatsStore = createStore(defaultMacroRepeats, { name: 'macroRepeats' })

sample({
  clock: macroTitleChanged,
  source: macroTitleStore
})
sample({
  clock: macroEdited,
  source: macrosStore,
  fn: (macros, i) => macros[i].title,
  target: macroTitleStore
})
sample({
  clock: macroCreated,
  source: macrosStore,
  fn: macros => `Macro ${macros.length + 1}`,
  target: macroTitleStore
})

macroRepeatsStore.reset(macroCreated, editedMacroRemoved)
sample({
  clock: macroRepeatsChanged,
  target: macroRepeatsStore
})
sample({
  clock: macroEdited,
  source: macrosStore,
  target: macroRepeatsStore,
  fn: (macros, i) => macros[i].repeats
})

import { createEvent, createStore, sample } from 'effector'

import { macroRemoved } from '$entities/keys'

import { newStepIndex } from '../../lib/constants'

export const macroCreated = createEvent('macroCreated')
export const macroEdited = createEvent<number>('macroEdited')
export const editedMacroSubmitted = createEvent('editedMacroSubmitted')
export const editedMacroRemoved = createEvent('editedMacroRemoved')

export const editedIndexStore = createStore(newStepIndex, {
  name: 'macroIndex',
})

editedIndexStore.on(macroEdited, (_, index) => index)
editedIndexStore.reset(macroCreated)

sample({
  clock: editedMacroRemoved,
  source: editedIndexStore,
  target: macroRemoved,
})

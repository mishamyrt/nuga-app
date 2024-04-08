import { createEvent, createStore } from 'effector'

import { macroCreated, macroEdited } from './lifecycle'

export const modalClosed = createEvent('modalClosed')

export const showMacroModalStore = createStore(false, {
  name: 'showMacroModal',
})

showMacroModalStore.on([macroCreated, macroEdited], () => true)
showMacroModalStore.reset(modalClosed)

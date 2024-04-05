import { createEvent, createStore, sample } from 'effector'

import { macroChanged, macrosStore, type MacroStep, macroStepsStore } from '$entities/keys'
import { stepsToActions } from '$entities/keys/lib'

export const macroEdited = createEvent<number>('macroEdited')
export const macroCreated = createEvent('macroCreated')

export const macroSubmitted = createEvent('macroSubmitted')

export const modalClosed = createEvent('modalClosed')

export const macroTitleChanged = createEvent<string>('macroTitleChanged')
export const macroRepeatsChanged = createEvent<number>('macroRepeatsChanged')

const indexStore = createStore<number>(-1, { name: 'macroIndex' })
export const macroTitleStore = createStore<string>('Macro', { name: 'macroTitle' })
export const macroRepeatsStore = createStore<number>(1, { name: 'macroRepeats' })
export const currentMacroStepsStore = createStore<MacroStep[]>([], { name: 'currentMacroSteps' })
export const showMacroModalStore = createStore<boolean>(false, { name: 'showMacroModal' })

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
sample({
  clock: macroEdited,
  target: indexStore
})

// Set clear macro on create
sample({
  clock: macroCreated,
  source: macrosStore,
  fn: macros => `Macro ${macros.length + 1}`,
  target: macroTitleStore
})
currentMacroStepsStore.reset(macroCreated)
macroRepeatsStore.reset(macroCreated)

// Update fields value on change
macroTitleStore.on(macroTitleChanged, (_, title) => title)
macroRepeatsStore.on(macroRepeatsChanged, (_, repeats) => repeats)

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
      actions: stepsToActions(steps),
      index
    }
  },
  target: macroChanged
})

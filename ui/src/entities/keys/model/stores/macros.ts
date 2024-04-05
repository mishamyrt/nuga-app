import { createEvent, createStore, sample } from 'effector'

import { createHIDEffect, disconnected } from '$shared/model'

import { getMacros, setMacros } from '../../api'
import { macroToSteps, paramsToMacro } from '../../lib'
import type { Macro, MacroChangedParams } from '../types'
import { keysInitiated } from './keymap'

export const macroChanged = createEvent<MacroChangedParams>('macrosUpdated')
export const macrosChanged = createEvent<Macro[]>('macrosChanged')

export const macrosStore = createStore<Macro[]>([], {
  name: 'macros'
})

export const macroStepsStore = macrosStore.map(macros => macros.map(macroToSteps))

const getMacrosFx = createHIDEffect({
  name: 'getMacrosFx',
  handler: getMacros
})
const setMacrosFx = createHIDEffect({
  name: 'setMacrosFx',
  handler: setMacros
})

macrosStore.on(macrosChanged, (_, macros) => macros)
macrosStore.reset(disconnected)

sample({
  clock: macroChanged,
  source: macrosStore,
  fn: (all, updatedMacro) => {
    if (updatedMacro.index === -1) {
      return [...all, paramsToMacro(updatedMacro)]
    } else {
      return all.map((macro, i) => {
        if (i === updatedMacro.index) {
          return paramsToMacro(updatedMacro)
        }
        return macro
      })
    }
  },
  target: macrosChanged
})

sample({
  clock: keysInitiated,
  target: getMacrosFx
})

sample({
  clock: getMacrosFx.doneData,
  target: macrosStore
})

sample({
  clock: macrosChanged,
  target: setMacrosFx
})

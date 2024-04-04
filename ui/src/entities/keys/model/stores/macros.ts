import { createStore, sample } from 'effector'

import { createHIDEffect } from '$shared/model'

import { getMacros } from '../../api'
import { macroToSteps } from '../../lib'
import type { Macro, MacroStep } from '../types'
import { keysInitiated } from './keymap'

export const macroStore = createStore<Macro[]>([], {
  name: 'macros'
})

export const macroStepsStore = createStore<MacroStep[][]>([], {
  name: 'macroSteps'
})

sample({
  clock: macroStore,
  fn: macros => macros.map(macroToSteps),
  target: macroStepsStore
})

const getMacrosFx = createHIDEffect({
  name: 'getMacrosFx',
  handler: getMacros
})

sample({
  clock: keysInitiated,
  target: getMacrosFx
})

sample({
  clock: getMacrosFx.doneData,
  target: macroStore
})

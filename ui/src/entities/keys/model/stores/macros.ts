import { createStore, sample } from 'effector'

import { createHIDEffect } from '$shared/model'

import { getMacros } from '../../api'
import { type Macro } from '../types'
import { keysInitiated } from './keymap'

export const macroStore = createStore<Macro[]>([], {
  name: 'macros'
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

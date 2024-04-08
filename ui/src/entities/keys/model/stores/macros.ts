import { createEvent, createStore, sample } from 'effector'

import { createHIDEffect, disconnected } from '$shared/model'

import { getMacros, setMacros } from '../../api'
import { paramsToMacro } from '../../lib'
import {
  type KeyAction,
  KeyActionType,
  type KeyMap,
  type Macro,
  type MacroChangedParams,
} from '../types'
import { keyMapChanged, keyMapStore, keysInitiated } from './keymap'

export const macroChanged = createEvent<MacroChangedParams>('macrosUpdated')
export const macroRemoved = createEvent<number>('macroRemoved')
export const macrosChanged = createEvent<Macro[]>('macrosChanged')

export const macrosStore = createStore<Macro[]>([], {
  name: 'macros',
})

const getMacrosFx = createHIDEffect({
  name: 'getMacrosFx',
  handler: getMacros,
})
const setMacrosFx = createHIDEffect({
  name: 'setMacrosFx',
  handler: setMacros,
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
  target: macrosChanged,
})

sample({
  clock: macroRemoved,
  source: macrosStore,
  fn: (all, index) => all.filter((_, i) => i !== index),
  target: macrosChanged,
})

sample({
  clock: macroRemoved,
  source: keyMapStore,
  fn: (keyMap, index) => {
    return Object.entries(keyMap).reduce<KeyMap>((acc, [key, action]) => {
      let nextAction: KeyAction
      if (action.type === KeyActionType.Macro) {
        if (action.macro === index) {
          nextAction = { type: KeyActionType.None }
        } else if (action.macro > index) {
          nextAction = { type: KeyActionType.Macro, macro: action.macro - 1 }
        } else {
          nextAction = action
        }
        return {
          ...acc,
          [key]: nextAction,
        }
      }
      return {
        ...acc,
        [key]: action,
      }
    }, {})
  },
  target: keyMapChanged,
})

sample({
  clock: keysInitiated,
  target: getMacrosFx,
})

sample({
  clock: getMacrosFx.doneData,
  target: macrosStore,
})

sample({
  clock: macrosChanged,
  target: setMacrosFx,
})

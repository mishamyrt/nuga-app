import { createEffect, createEvent, createStore, sample } from 'effector'

import { connected } from '$shared/model'

import { getMode, setMode } from '../../api'
import { OSMode } from '../types'

export const modeStore = createStore<OSMode>(OSMode.MacOS, {
  name: 'mode'
})
export const modeChanged = createEvent<OSMode>('modeChanged')
const getModeFx = createEffect('getMode', { handler: getMode })
const setModeFx = createEffect('setMode', { handler: setMode })

modeStore.on([
  getModeFx.doneData,
  modeChanged
], (_, value) => value)

sample({
  clock: modeChanged,
  target: setModeFx
})

sample({
  clock: connected,
  target: getModeFx
})

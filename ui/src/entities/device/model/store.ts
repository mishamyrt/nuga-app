import { createEffect, createEvent, createStore, sample } from 'effector'
import { or } from 'patronum'

import { connected, createHIDEffect } from '$shared/model'

import { getFirmware, getSupports } from '../api'
import { restoreDefaultState, restoreState, saveState } from '../api/state'
import { defaultSupports } from '../lib/constants'

export const firmwareVersionUpdated = createEvent<string>('firmwareVersionUpdated')
export const userStateSaved = createEvent('stateSaved')
export const userStateRestored = createEvent('stateRestored')
export const defaultStateRestored = createEvent('defaultStateRestored')
// Combined events. Triggers AFTER state effects
export const anyStateRestored = createEvent('anyStateRestored')

export const supportsStore = createStore(defaultSupports, { name: 'supports' })
export const firmwareVersionStore = createStore('dev', {
  name: 'firmwareVersion'
})

export const getFirmwareFx = createEffect('getFirmware', { handler: getFirmware })
export const getSupportsFx = createEffect('getSupports', { handler: getSupports })
export const saveStateFx = createHIDEffect({
  name: 'saveStateFx',
  handler: saveState
})
export const restoreUserStateFx = createHIDEffect({
  name: 'restoreUserStateFx',
  handler: restoreState
})
export const restoreDefaultStateFx = createHIDEffect({
  name: 'restoreDefaultStateFx',
  handler: restoreDefaultState
})

sample({
  clock: getFirmwareFx.doneData,
  target: firmwareVersionUpdated
})

firmwareVersionStore.on(firmwareVersionUpdated, (_, value) => value)
supportsStore.on(getSupportsFx.doneData, (_, value) => value)

sample({
  clock: connected,
  target: [getFirmwareFx, getSupportsFx]
})

sample({
  clock: userStateSaved,
  target: saveStateFx
})
sample({
  clock: userStateRestored,
  target: restoreUserStateFx
})
sample({
  clock: defaultStateRestored,
  target: restoreDefaultStateFx
})
sample({
  clock: [restoreUserStateFx.done, restoreDefaultStateFx.done],
  target: anyStateRestored
})

export const restoringStateStore = or(restoreUserStateFx.pending, restoreDefaultStateFx.pending)

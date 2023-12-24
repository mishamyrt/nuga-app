import { createEffect, createEvent, createStore, sample } from 'effector'

import { createSequence } from '$shared/lib'
import { connected } from '$shared/model'

import { getBacklightColors } from '../api/color'
import { getModes } from '../api/mode'
import { getLightState, setLightState } from '../api/state'
import { backlightDefaultColors, defaultDomainState, defaultModes } from './const'
import type { LightBacklightColors, LightModes, LightState } from './types'

export const stateStore = createStore<LightState>({
  backlight: defaultDomainState,
  halo: defaultDomainState,
  sidelight: defaultDomainState
}, { name: 'state' })
export const stateSet = createEvent<LightState>('stateSet')

const [createHIDEffect] = createSequence({
  minInterval: 200
})
const getStateFx = createHIDEffect('getState', getLightState)
export const setStateFx = createHIDEffect('setState', setLightState)

sample({
  clock: stateSet,
  target: setStateFx
})

stateStore.on(stateSet, (_, state) => state)
stateStore.on(getStateFx.doneData, (current, loaded) => {
  const backlight = loaded.backlight.enabled
    ? loaded.backlight
    : {
        ...current.backlight,
        enabled: false
      }

  return {
    backlight,
    halo: loaded.halo,
    sidelight: loaded.sidelight
  }
})

export const modesStore = createStore<LightModes>({
  backlight: defaultModes,
  halo: defaultModes,
  sidelight: defaultModes
}, { name: 'modes' })
const getModesFx = createEffect(getModes)
modesStore.on(getModesFx.doneData, (_, modes) => modes)

export const backlightColorsStore = createStore<LightBacklightColors>(
  backlightDefaultColors,
  { name: 'backlightColors' }
)
export const backlightColorsUpdated = createEvent<LightBacklightColors>('backlightColors')
const getBacklightColorsFx = createEffect('getBacklightColors', {
  handler: getBacklightColors
})
backlightColorsStore.on(getBacklightColorsFx.doneData, (_, colors) => colors)

sample({
  clock: connected,
  target: [getStateFx, getModesFx, getBacklightColorsFx]
})

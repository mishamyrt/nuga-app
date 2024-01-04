import { createEvent, sample } from 'effector'

import { stateSet, stateStore } from '$entities/lights'

import type { LightBrightnessParams } from './types'

export const brightnessChanged = createEvent<LightBrightnessParams>('brightnessChanged')

sample({
  clock: brightnessChanged,
  source: stateStore,
  fn: (state, params) => {
    return {
      ...state,
      [params.domain]: {
        ...state[params.domain],
        brightness: params.brightness
      }
    }
  },
  target: stateSet
})

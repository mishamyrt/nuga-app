import { createEvent, sample } from 'effector'

import { stateSet, stateStore } from '$entities/lights'

import type { LightSpeedParams } from './types'

export const speedChanged = createEvent<LightSpeedParams>('brightnessChanged')

sample({
  clock: speedChanged,
  source: stateStore,
  fn: (state, params) => {
    return {
      ...state,
      [params.domain]: {
        ...state[params.domain],
        speed: params.speed
      }
    }
  },
  target: stateSet
})

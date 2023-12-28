import { createEvent, sample } from 'effector'

import { stateSet, stateStore } from '$entities/lights'

import type { LightEnabledParams } from './types'

export const powerStateChanged = createEvent<LightEnabledParams>('powerStateChanged')

sample({
  clock: powerStateChanged,
  source: stateStore,
  fn: (state, req) => {
    return {
      ...state,
      [req.domain]: {
        ...state[req.domain],
        enabled: req.enabled
      }
    }
  },
  target: stateSet
})

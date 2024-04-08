import { createEvent, sample } from 'effector'

import { stateSet, stateStore } from '$entities/lights'

import type { LightModeParams } from './types'

export const modeChanged = createEvent<LightModeParams>('modeChanged')

sample({
  clock: modeChanged,
  source: stateStore,
  fn: (state, params) => {
    return {
      ...state,
      [params.domain]: {
        ...state[params.domain],
        mode: params.mode,
      },
    }
  },
  target: stateSet,
})

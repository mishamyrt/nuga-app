import { createEvent, sample } from 'effector'

import { stateSet, stateStore } from '$entities/lights'

import type { LightColorParams } from './types'

export const colorChanged = createEvent<LightColorParams>('colorChanged')

sample({
  clock: colorChanged,
  source: stateStore,
  fn: (state, params) => {
    return {
      ...state,
      [params.domain]: {
        ...state[params.domain],
        color: params.color,
      },
    }
  },
  target: stateSet,
})

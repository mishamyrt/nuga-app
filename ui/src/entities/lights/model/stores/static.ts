import { createEffect, createStore, sample } from 'effector'

import { connected } from '$shared/model'

import { getModesDomains } from '../../api'
import { defaultLightModes, domainsToModes } from '../../lib'
import type { LightModes } from '../types'

export const modesStore = createStore<LightModes>(defaultLightModes, { name: 'modesStore' })

export const getModesDomainsFx = createEffect(getModesDomains)

sample({
  clock: getModesDomainsFx.doneData,
  fn: domainsToModes,
  target: modesStore
})
sample({
  clock: connected,
  target: [getModesDomainsFx]
})

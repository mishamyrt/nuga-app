import { createEffect, createEvent, createStore, sample } from 'effector'

import { setLogging } from './utils'

export const loggingChanged = createEvent<boolean>()

export const loggingStateStore = createStore(false, {
  name: 'loggingStateStore'
})

export const setLoggingFx = createEffect('setLoggingFx', {
  handler: setLogging
})

sample({
  clock: loggingChanged,
  target: setLoggingFx
})
loggingStateStore.on(loggingChanged, (_, enabled) => enabled)

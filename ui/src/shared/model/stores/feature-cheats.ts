import { createEffect, createEvent, createStore, sample } from 'effector'
import { createCheatsListener } from 'hesoyam'

import { defaultFeatures, featureCheats } from '../constants'
import type { CheatFeatures } from '../types'

export const cheatInputStarted = createEvent('inputStarted')
export const cheatInputEnded = createEvent('inputEnded')
export const cheatReceived = createEvent<string>('cheatReceived')

const { start, stop } = createCheatsListener({
  onCheat: (cheat) => {
    cheatReceived(cheat)
  },
  cheats: featureCheats
})

const startFx = createEffect(start)
const stopFx = createEffect(stop)

export const cheatListeningStore = createStore(false, {
  name: 'cheatListening'
})
export const activeFeaturesStore = createStore(defaultFeatures, {
  name: 'activeFeatures'
})

cheatInputStarted.watch(start)
cheatInputEnded.watch(stop)
cheatListeningStore.on(cheatInputStarted, () => true)
cheatListeningStore.on(cheatInputEnded, () => false)

activeFeaturesStore.on(cheatReceived, (state, cheat) => ({
  ...state,
  [cheat]: !state[cheat as CheatFeatures]
}))

sample({
  clock: cheatReceived,
  target: cheatInputEnded
})

sample({
  source: cheatInputStarted,
  target: startFx
})
sample({
  source: cheatInputEnded,
  target: stopFx
})

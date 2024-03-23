import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { empty, not } from 'patronum'

import { anyStateRestored, supportsStore } from '$entities/device/@x/keys'
import { defaultKey, defaultKeyAction, defaultKeyMap } from '$entities/keys'
import { createHIDEffect, modeChanged } from '$shared/model'

import { getKeys, setKeys } from '../../api'
import type { ActionChangeParams, Key, KeyMap } from '../types'

export const supportsKeyStore = supportsStore.map(({ keys }) => keys)
export const keysInitiated = createEvent('keysInitiated')
export const keySelected = createEvent<Key>('keySelected')
export const actionChanged = createEvent<ActionChangeParams>('actionChanged')

export const keyMapStore = createStore<KeyMap>(defaultKeyMap, { name: 'keyMap' })
export const selectedKeyStore = createStore<Key>(defaultKey, { name: 'selectedKey' })

export const primaryActionStore = combine(keyMapStore, selectedKeyStore, (keyMap, key) => {
  if (key.code === 'none' || !keyMap[key.code]) {
    return defaultKeyAction
  }
  return keyMap[key.code]
})
export const secondaryActionStore = combine(keyMapStore, selectedKeyStore, (keyMap, key) => {
  if (!key.secondaryCode) {
    return null
  }
  if (key.secondaryCode === 'none') {
    return defaultKeyAction
  }
  return keyMap[key.secondaryCode] ?? null
})
export const hasSecondaryActionStore = not(empty(secondaryActionStore))

const getKeysFx = createHIDEffect({
  name: 'getKeysFx',
  handler: getKeys
})
const setKeysFx = createEffect('setKeys', { handler: setKeys })

// Report that supported device is connected
sample({
  clock: supportsStore,
  filter: ({ keys }) => keys,
  target: keysInitiated
})

// Load keys on device connect
sample({
  clock: [keysInitiated, anyStateRestored, modeChanged],
  target: getKeysFx
})
sample({
  clock: getKeysFx.doneData,
  target: keyMapStore
})

// Handle key
sample({
  clock: keySelected,
  target: selectedKeyStore
})

sample({
  clock: actionChanged,
  source: keyMapStore,
  fn: (map, { key, action }) => ({
    ...map,
    [key]: action
  }),
  target: [keyMapStore, setKeysFx]
})

import { combine, createEvent, createStore, sample } from 'effector'
import { empty, not } from 'patronum'

import { supportsStore } from '$entities/device'
import { defaultKey, defaultKeyMap } from '$entities/keys'
import { createHIDEffect } from '$shared/model'

import { getKeys } from '../../api'
import type { ActionChangeParams, Key, KeyMap } from '../types'

export const keysInitiated = createEvent('keysInitiated')
export const keySelected = createEvent<Key>('keySelected')
export const actionChanged = createEvent<ActionChangeParams>('actionChanged')

export const keyMapStore = createStore<KeyMap>(defaultKeyMap, { name: 'keyMap' })
export const selectedKeyStore = createStore<Key>(defaultKey, { name: 'selectedKey' })

export const primaryActionStore = combine(keyMapStore, selectedKeyStore, (keyMap, key) => {
  return keyMap[key.code]
})
export const secondaryActionStore = combine(keyMapStore, selectedKeyStore, (keyMap, key) => {
  if (!key.secondaryCode) {
    return null
  }
  return keyMap[key.secondaryCode] ?? null
})
export const hasSecondaryActionStore = not(empty(secondaryActionStore))

const getKeysFx = createHIDEffect('getKeysFx', getKeys)

// Report that supported device is connected
sample({
  clock: supportsStore,
  filter: ({ keys }) => keys,
  target: keysInitiated
})

// Load keys on device connect
sample({
  clock: keysInitiated,
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
keyMapStore.on(actionChanged, (map, { key, action }) => ({
  ...map,
  [key]: action
}))

import { combine, createEvent, createStore, sample } from 'effector'
import { once } from 'patronum'

import { defaultChangesMap, isSameAction } from '../../lib'
import type { KeyChangesMap, KeyMap } from '../types'
import { actionChanged, keyMapStore, keysInitiated } from './keymap'
import { defaultKeyMapStore } from './static'

export const changesMapStore = createStore<KeyChangesMap>(defaultChangesMap, {
  name: 'changesMap',
})

const mapsStore = combine(
  keyMapStore,
  defaultKeyMapStore,
  (keyMap, defaultKeyMap) => ({ keyMap, defaultKeyMap }),
)

const keysFilled = createEvent('keysFilled')
sample({
  clock: mapsStore,
  filter: ({ keyMap, defaultKeyMap }) => {
    return Object.keys(keyMap).length > 1 && Object.keys(defaultKeyMap).length > 1
  },
  target: keysFilled,
})

const keysLoaded = once({
  source: keysFilled,
  reset: keysInitiated,
})

sample({
  clock: keysLoaded,
  source: [keyMapStore, defaultKeyMapStore],
  fn: ([keyMap, defaultKeyMap]) => {
    console.log('Keys init', { keyMap, defaultKeyMap })
    const changes: KeyChangesMap = {}
    for (const key in defaultKeyMap) {
      changes[key] = !isSameAction(defaultKeyMap[key], keyMap[key])
    }
    return changes
  },
  target: changesMapStore,
})

sample({
  clock: actionChanged,
  source: [defaultKeyMapStore, changesMapStore],
  fn: (sources, { key, action }) => {
    const [defaultKeyMap, changesMap] = sources as [KeyMap, KeyChangesMap]
    return {
      ...changesMap,
      [key]: !isSameAction(defaultKeyMap[key], action),
    }
  },
  target: changesMapStore,
})

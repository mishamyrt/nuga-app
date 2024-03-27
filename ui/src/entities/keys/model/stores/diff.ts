import deepEqual from 'deep-equal'
import { combine, createEvent, createStore, sample } from 'effector'
import { once } from 'patronum'

import { defaultChangesMap } from '../../lib'
import type { KeyChangesMap, KeyMap } from '../types'
import { actionChanged, keyMapStore, keysInitiated } from './keymap'
import { defaultKeyMapStore } from './static'

export const changesMapStore = createStore<KeyChangesMap>(
  defaultChangesMap,
  { name: 'changesMap' }
)

const mapsStore = combine(
  keyMapStore, defaultKeyMapStore,
  (keyMap, defaultKeyMap) => ({ keyMap, defaultKeyMap })
)

const keysFilled = createEvent('keysFilled')
sample({
  clock: mapsStore,
  filter: ({ keyMap, defaultKeyMap }) => {
    return Object.keys(keyMap).length > 1 && Object.keys(defaultKeyMap).length > 1
  },
  target: keysFilled
})

const keysLoaded = once({
  source: keysFilled,
  reset: keysInitiated
})

sample({
  clock: keysLoaded,
  source: [keyMapStore, defaultKeyMapStore],
  fn: ([keyMap, defaultKeyMap]) => {
    const changes: KeyChangesMap = {}
    for (const key in defaultKeyMap) {
      changes[key] = !deepEqual(defaultKeyMap[key], keyMap[key])
    }
    return changes
  },
  target: changesMapStore
})

sample({
  clock: actionChanged,
  source: [defaultKeyMapStore, changesMapStore],
  fn: (sources, { key, action }) => {
    const [defaultKeyMap, changesMap] = sources as [KeyMap, KeyChangesMap]
    const defaultAction = defaultKeyMap[key]
    const isModifiersChanged =
      defaultAction.modifiers.ctrl !== action.modifiers.ctrl ||
      defaultAction.modifiers.shift !== action.modifiers.shift ||
      defaultAction.modifiers.alt !== action.modifiers.alt ||
      defaultAction.modifiers.meta !== action.modifiers.meta
    const isKeyChanged = defaultAction.key !== action.key || isModifiersChanged
    return {
      ...changesMap,
      [key]: isKeyChanged
    }
  },
  target: changesMapStore
})

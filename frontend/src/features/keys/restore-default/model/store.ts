import deepEqual from 'deep-equal'
import { combine, createEvent, createStore, sample } from 'effector'

import {
  defaultKeyAction,
  defaultKeyMapStore,
  type KeyAction,
  selectedActionStore,
  selectedKeyStore
} from '$entities/keys'

export const defaultActionRestored = createEvent('defaultActionRestored')

export const defaultActionStore = createStore<KeyAction>(defaultKeyAction, { name: 'keyDefaultAction' })
export const isActionChangedStore = combine(
  defaultActionStore,
  selectedActionStore,
  (defaultAction, selectedAction) => !deepEqual(defaultAction, selectedAction)
)

sample({
  clock: selectedKeyStore,
  source: defaultKeyMapStore,
  target: defaultActionStore,
  fn: (map, key) => map[key]
})

sample({
  clock: defaultActionRestored,
  source: defaultActionStore,
  target: selectedActionStore,
  fn: (action) => action
})

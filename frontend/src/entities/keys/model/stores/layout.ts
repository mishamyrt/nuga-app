import { createEffect, createEvent, createStore, sample } from 'effector'

import { supportsStore } from '$entities/device'
import { defaultKeyAction } from '$entities/keys'

import { getGroups, getKeys } from '../../api'
import type { KeyAction, KeyGroup, KeyMap, KeyNames } from '../types'

export const keySelected = createEvent<string>('keySelected')
export const keyActionChanged = createEvent<KeyAction>('keyActionChanged')

export const keyMapStore = createStore<KeyMap>({}, { name: 'keyMap' })
export const keyGroupsStore = createStore<KeyGroup[]>([], { name: 'keyGroups' })
export const keyNamesStore = createStore<KeyNames>({}, { name: 'keyNames' })

export const selectedKeyStore = createStore<string>('none', { name: 'selectedKey' })
export const selectedActionStore = createStore<KeyAction>(defaultKeyAction, {
  name: 'selectedAction'
})

const getKeysFx = createEffect('getKeysFx', { handler: getKeys })
const getGroupsFx = createEffect('getGroupsFx', { handler: getGroups })

sample({
  clock: supportsStore,
  filter: ({ keys }) => keys,
  target: [getGroupsFx, getKeysFx]
})

keyMapStore.on(getKeysFx.doneData, (_, keys) => keys)
keyGroupsStore.on(getGroupsFx.doneData, (_, groups) => groups)
keyNamesStore.on(keyGroupsStore, (_, groups) => {
  return groups
    .flatMap((g) => g.keys)
    .reduce((all, group) => ({
      ...all,
      [group.value]: group.title
    }), {})
})

selectedActionStore.on(keyActionChanged, (_, action) => action)
selectedKeyStore.on(keySelected, (_, key) => key)

sample({
  clock: keySelected,
  source: [keyMapStore, keyNamesStore],
  target: selectedActionStore,
  fn (sources, key) {
    const [map, names] = sources as [KeyMap, KeyNames]
    const title = names[key]
    if (!title) {
      throw new Error(`Key '${key}' is not found`)
    }
    return {
      ...map[key],
      title
    }
  }
})

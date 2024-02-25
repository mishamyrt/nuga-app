import { createEffect, createEvent, createStore, sample } from 'effector'

import { supportsStore } from '$entities/device'
import { defaultKeyAction } from '$entities/keys'
import { createHIDEffect } from '$shared/model'

import { getDefaultKeys, getGroups, getKeys } from '../../api'
import type { KeyAction, KeyGroup, KeyMap, KeyNames } from '../types'

export const keySelected = createEvent<string>('keySelected')
export const keyActionChanged = createEvent<KeyAction>('keyActionChanged')

export const keyMapStore = createStore<KeyMap>({}, { name: 'keyMap' })
export const defaultKeyMapStore = createStore<KeyMap>({}, { name: 'defaultKeyMap' })
export const keyGroupsStore = createStore<KeyGroup[]>([], { name: 'keyGroups' })
export const keyNamesStore = createStore<KeyNames>({}, { name: 'keyNames' })

export const selectedKeyStore = createStore<string>('none', { name: 'selectedKey' })
export const selectedActionStore = createStore<KeyAction>(defaultKeyAction, {
  name: 'selectedAction'
})

const getGroupsFx = createEffect('getGroupsFx', { handler: getGroups })
const getKeysFx = createHIDEffect('getKeysFx', getKeys)
const getDefaultKeysFx = createHIDEffect('getDefaultKeysFx', getDefaultKeys)

sample({
  clock: supportsStore,
  filter: ({ keys }) => keys,
  target: [getGroupsFx, getKeysFx, getDefaultKeysFx]
})

defaultKeyMapStore.on(getDefaultKeysFx.doneData, (_, keys) => keys)
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
  clock: selectedKeyStore,
  source: keyMapStore,
  target: selectedActionStore,
  fn: (map, key) => map[key]
})

import { createEffect, createStore, sample } from 'effector'

import { createHIDEffect } from '$shared/model'

import { getDefaultKeys, getGroups } from '../../api'
import { codelessKeyNames, defaultKeyMap, hiddenGroups } from '../../lib'
import type { DisplayedKeyGroup, KeyMap, KeyNames } from '../types'
import { keysInitiated } from './keymap'

// This stores is mostly static. Data should be loaded only once after connection
export const defaultKeyMapStore = createStore<KeyMap>(defaultKeyMap, { name: 'defaultKeyMap' })
export const keyGroupsStore = createStore<DisplayedKeyGroup[]>([], { name: 'keyGroups' })
export const keyNamesStore = createStore<KeyNames>({}, { name: 'keyNames' })

const getGroupsFx = createEffect('getGroupsFx', { handler: getGroups })
const getDefaultKeysFx = createHIDEffect({
  name: 'getDefaultKeysFx',
  handler: getDefaultKeys
})

sample({
  clock: keysInitiated,
  target: [getGroupsFx, getDefaultKeysFx]
})

defaultKeyMapStore.on(getDefaultKeysFx.doneData, (_, keys) => keys)
keyGroupsStore.on(getGroupsFx.doneData, (_, groups) => {
  return groups.map((group) => ({
    ...group,
    visible: !hiddenGroups.has(group.title)
  }))
})
keyNamesStore.on(keyGroupsStore, (_, groups) => {
  return groups
    .flatMap((g) => g.keys)
    .reduce((all, group) => ({
      ...all,
      [group.value]: group.title
    }), codelessKeyNames)
})

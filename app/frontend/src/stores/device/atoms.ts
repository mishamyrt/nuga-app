import { atom, computed, map } from 'nanostores'
import type { ConnectionDescription, Mode } from './types'

export const connection = atom<ConnectionDescription | undefined>()
export const connected = computed(connection, Boolean)

export const mode = map<Mode>({
  os: 'mac',
  individual: false
})
export const osMode = computed(mode, value => value.os)
export const individual = computed(mode, value => value.individual)

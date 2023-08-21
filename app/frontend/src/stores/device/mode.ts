import { atom } from 'nanostores'
import type { OSMode } from './types'

export const osMode = atom<OSMode>('mac')
export const individualSettings = atom<boolean>(false)

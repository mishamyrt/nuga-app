import { atom, computed } from 'nanostores'

export const version = atom<string>('dev')

export const updateUrl = atom<string | undefined>()
export const hasUpdate = computed(updateUrl, Boolean)

import { atom } from 'nanostores'

export type SettingsView = 'lights' | 'system' | 'keys'

export const connected = atom<boolean>(false)
export const view = atom<SettingsView>('lights')

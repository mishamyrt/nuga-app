import { atom } from 'nanostores'

export type SettingsView = 'lights' | 'system' | 'keys'
type KeyboardMode = 'win' | 'mac'

export const connected = atom<boolean>(false)
export const view = atom<SettingsView>('lights')
export const keyboardMode = atom<KeyboardMode>('mac')

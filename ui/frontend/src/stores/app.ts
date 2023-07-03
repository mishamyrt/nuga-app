import { GetVersion } from '../../wailsjs/go/main/App'
import { atom } from 'nanostores'

export type SettingsView = 'lights' | 'system' | 'keys'
type KeyboardMode = 'win' | 'mac'

export const connected = atom<boolean>(false)
export const view = atom<SettingsView>('lights')
export const keyboardMode = atom<KeyboardMode>('mac')
export const version = atom<string>('dev')

export async function loadVersion() {
  const appVersion = await GetVersion()
  version.set(appVersion)
}

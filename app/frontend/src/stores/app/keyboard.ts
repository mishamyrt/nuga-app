import { atom } from 'nanostores'
import { SetMode } from '../../../wailsjs/go/nuga/App'

export type OSMode = 'win' | 'mac'

export const connected = atom<boolean>(false)
export const osMode = atom<OSMode>('mac')
export const individualSettings = atom<boolean>(false)

export async function setMode (): Promise<void> {
  if (individualSettings.get()) {
    await SetMode(0)
    return
  }
  const mode = osMode.get() === 'win' ? 1 : 2
  await SetMode(mode)
}

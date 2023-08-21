import { atom, task } from 'nanostores'
import { SetMode } from '../../../wailsjs/go/nuga/App'
import type { OSMode } from './types'

export const osMode = atom<OSMode>('mac')
export const individualSettings = atom<boolean>(false)

const osModeValues: Record<OSMode, number> = {
  win: 1,
  mac: 2
}

export async function setMode (): Promise<void> {
  if (individualSettings.get()) {
    await SetMode(0)
    return
  }
  await SetMode(osModeValues[osMode.get()])
}

function handleOsModeChange (): void {
  task(async () => {
    await setMode()
  })
}

export async function initKeyboard (): Promise<void> {
  osMode.listen(handleOsModeChange)
  individualSettings.listen(handleOsModeChange)
}

import { GetMode, SetMode } from '$wails/go/usecase/SettingsUsecase'

import type { OSMode } from '../model/types'

export async function getMode (): Promise<OSMode> {
  const mode = await GetMode()
  if (!mode) {
    throw new Error('Mode settings is not defined')
  }
  return mode as OSMode
}

export async function setMode (mode: OSMode) {
  await SetMode(mode)
}

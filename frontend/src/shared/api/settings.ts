import { GetMode, SetMode } from '$wailsjs/go/usecase/SettingsUsecase'

import type { ModeSettings } from '../model/types'

export async function getModeSettings (): Promise<ModeSettings> {
  const settings = await GetMode()
  if (!settings) {
    throw new Error('Mode settings is not defined')
  }
  return settings as ModeSettings
}

export async function setModeSettings (settings: ModeSettings) {
  await SetMode(settings)
}

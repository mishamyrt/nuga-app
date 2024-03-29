import { GetAppSettings, SetAppSettings } from '$wails/go/usecase/SettingsUsecase'

import type { AppSettings } from '../model/types'

export async function getAppSettings (): Promise<AppSettings> {
  const settings = await GetAppSettings()
  if (!settings?.theme || !settings.ui) {
    throw new Error('App settings is not defined')
  }
  return settings as AppSettings
}

export async function setAppSettings (settings: AppSettings) {
  await SetAppSettings(settings)
}

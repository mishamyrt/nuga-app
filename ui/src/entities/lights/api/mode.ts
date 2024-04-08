import { GetLightModes } from '$wails/go/usecase/LightsUsecase'

import type { RawLightDomain } from '../model/types'

export async function getModesDomains (): Promise<RawLightDomain[]> {
  const items = await GetLightModes()
  return items
}

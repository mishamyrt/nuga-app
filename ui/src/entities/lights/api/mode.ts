import type { light } from '$wails/go/models'
import { GetLightModes } from '$wails/go/usecase/LightsUsecase'

export async function getModesDomains (): Promise<light.Domain[]> {
  const items = await GetLightModes()
  return items
}

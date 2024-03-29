import type { light } from '$wails/go/models'
import { GetLightModes } from '$wails/go/usecase/LightsUsecase'

import type { LightModes } from '../model/types'
import { parseModes } from '../utils'

export async function getModes (): Promise<LightModes> {
  const items = await GetLightModes() as light.Domain[]
  return items.reduce<Record<string, any>>((acc, domain) => {
    return {
      ...acc,
      [domain.name.toLowerCase()]: parseModes(domain.modes)
    }
  }, {}) as LightModes
}

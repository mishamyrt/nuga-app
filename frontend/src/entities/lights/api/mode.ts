
import type { effect } from '$wailsjs/go/models'
import { GetLightModes } from '$wailsjs/go/usecase/LightsUsecase'

import type { LightModes } from '../model/types'
import { parseModes } from '../utils'

export async function getModes (): Promise<LightModes> {
  const items = await GetLightModes() as effect.Domain[]
  return items.reduce<Record<string, any>>((acc, domain) => {
    return {
      ...acc,
      [domain.name.toLowerCase()]: parseModes(domain.modes)
    }
  }, {}) as LightModes
}

import { GetLightModes } from '$wailsjs/go/nuga/App'

import type { LightModes } from '../model/types'
import { parseModes } from '../utils'

export async function getModes (): Promise<LightModes> {
  const items = await GetLightModes()
  return items.reduce<Record<string, any>>((acc, domain) => {
    return {
      ...acc,
      [domain.name.toLowerCase()]: parseModes(domain.modes)
    }
  }, {}) as LightModes
}

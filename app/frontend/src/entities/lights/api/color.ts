import { GetBacklightColors } from '$wailsjs/go/nuga/App'

import type { LightBacklightColors } from '../model/types'
import { rgbToHex } from '../utils/hex'

export async function getBacklightColors (): Promise<LightBacklightColors> {
  const colors = await GetBacklightColors()
  return colors.map(modeColors => modeColors.map(({ R, G, B }) => rgbToHex(R, G, B)))
}

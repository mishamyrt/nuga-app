import { GetBacklightColors, SetBacklightColor } from '$wails/go/usecase/LightsUsecase'

import type { LightBacklightColors, SetBacklightColorParams } from '../model/types'
import { rgbToHex } from '../utils/hex'

export async function getBacklightColors (): Promise<LightBacklightColors> {
  const colors: RGBColor[][] = await GetBacklightColors()
  return colors.map(modeColors => modeColors.map(({ R, G, B }) => rgbToHex(R, G, B)))
}

export async function setBacklightColor (
  { mode, colorIndex, color }: SetBacklightColorParams
): Promise<void> {
  await SetBacklightColor(mode, colorIndex, color)
}

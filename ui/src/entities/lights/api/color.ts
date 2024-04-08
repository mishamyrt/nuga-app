import { GetBacklightColors, SetBacklightColor } from '$wails/go/usecase/LightsUsecase'

import type { SetBacklightColorParams } from '../model/types'

export async function getBacklightColors (): Promise<RGBColor[][]> {
  const colors: RGBColor[][] = await GetBacklightColors()
  return colors
}

export async function setBacklightColor (
  { mode, colorIndex, color }: SetBacklightColorParams
): Promise<void> {
  await SetBacklightColor(mode, colorIndex, color)
}

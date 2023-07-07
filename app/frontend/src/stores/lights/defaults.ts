import type { Color, LightState } from "./types"

export const defaultState: LightState = {
  enabled: false,
  mode: 1,
  color: 0,
  speed: 4,
  brightness: 4
}

export const defaultColors: Color[] = [
  { R: 255, G: 0, B: 0 },
  { R: 0, G: 255, B: 0 },
  { R: 0, G: 0, B: 255 },
  { R: 255, G: 255, B: 0 },
  { R: 255, G: 0, B: 255 },
  { R: 0, G: 255, B: 255 },
  { R: 255, G: 255, B: 255 },
]

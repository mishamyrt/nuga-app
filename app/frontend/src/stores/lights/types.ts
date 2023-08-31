export interface LightState {
  color: number
  speed: number
  brightness: number
  mode: number
  enabled: boolean
}

export type LightDomain = 'backlight' | 'sidelight' | 'halo'

export interface LightMode {
  code: number
  supports: {
    specificColor: boolean
    randomColor: boolean
    speed: boolean
  }
  name: string
}

export interface EffectParams {
  color: number
  speed: number
  brightness: number
}

export type LightSetter = (
  mode: number,
  colorIndex: number,
  brightness: number,
  speed: number
) => Promise<void>

export interface Color {
  R: number
  G: number
  B: number
}

type RandomColor = 'random'

export type PreviewColor = Color | RandomColor | undefined

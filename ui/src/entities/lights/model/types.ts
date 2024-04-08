export type LightColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type LightStateValue = 0 | 1 | 2 | 3 | 4

export type LightDomain = 'backlight' | 'sidelight' | 'halo'

export type LightDomainState = {
  color: LightColorIndex
  speed: LightStateValue
  brightness: LightStateValue
  mode: number
  enabled: boolean
}

export type LightDomainColors = HexColor[]
export type LightBacklightColors = HexColor[][]

export type LightSupports = {
  specificColor: boolean
  randomColor: boolean
  speed: boolean
}

export type RawLightMode = {
  code: number
  name: string
  features: number
}

export type LightDomainMode = {
  supports: LightSupports
} & Omit<RawLightMode, 'features'>

export type LightEffectParams = {
  color: number
  speed: number
  brightness: number
}

export type RawLightDomain = {
  name: string
  modes: RawLightMode[]
}

export type RawEffect = {
  mode: RawLightMode
} & LightEffectParams

export type RawLightState = {
  backlight: RawEffect
  sidelight: RawEffect
  halo: RawEffect
  backlightParams?: LightEffectParams
}

export type LightState = Record<LightDomain, LightDomainState>

export type LightModes = Record<LightDomain, LightDomainMode[]>

export type KeyHighlightMatrix = HexColor[][]

export type LightDomainStateValue<T extends keyof LightDomainState> = {
  domain: LightDomain
} & Pick<LightDomainState, T>

export type KeyboardLightSupports = {
  sidelight: boolean
  halolight: boolean
  backlight: boolean
}

export type KeyboardLightsColor = {
  sidelight: HexColor
  halolight: HexColor
  backlight: KeyHighlightMatrix
}

export type SetBacklightColorParams = {
  mode: number
  colorIndex: number
  color: RGBColor
}

import { capitalize } from '$shared/lib'
import type { effect } from '$wailsjs/go/models'

import type { LightColorIndex, LightDomainMode, LightDomainState, LightEffectParams, LightStateValue } from '../model/types'

export function parseEffect (mode: number, params: LightEffectParams): LightDomainState {
  const enabled = mode !== 0
  return {
    enabled,
    mode: enabled ? mode : 1,
    color: params.color as LightColorIndex,
    speed: params.speed as LightStateValue,
    brightness: params.brightness as LightStateValue
  }
}

export function parseModes (m: effect.Mode[]): LightDomainMode[] {
  return m
    .map(i => ({
      name: capitalize(i.name),
      supports: {
        // Features from lib/pkg/light/effect/feature.go
        specificColor: (i.features & 1) !== 0,
        randomColor: (i.features & 4) !== 0,
        speed: (i.features & 16) !== 0
      },
      code: i.code
    }))
}

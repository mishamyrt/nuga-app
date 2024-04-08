import { capitalize } from '$shared/lib'

import type {
  LightDomainMode,
  LightModes,
  LightSupports,
  RawLightDomain,
  RawLightMode,
} from '../model/types'
import { LightSupportsCode } from './constants'

/**
 * Converts light features to light supports.
 * Feature codes are defined in `lib/pkg/light/effect/feature.go`
 */
export function featuresToSupports (features: number): LightSupports {
  return {
    specificColor: (features & LightSupportsCode.SpecificColor) !== 0,
    randomColor: (features & LightSupportsCode.RandomColor) !== 0,
    speed: (features & LightSupportsCode.Speed) !== 0,
  }
}

/**
 * Converts light mode to domain mode
 */
export function parseRawMode (m: RawLightMode): LightDomainMode {
  return {
    name: capitalize(m.name),
    supports: featuresToSupports(m.features),
    code: m.code,
  }
}

/**
 * Converts light domains array to light modes map
 */
export function parseRawDomains (modes: RawLightDomain[]): LightModes {
  return modes.reduce<Record<string, any>>((acc, domain) => {
    return {
      ...acc,
      [domain.name.toLowerCase()]: domain.modes.map(parseRawMode),
    }
  }, {}) as LightModes
}

/**
 * Utility to search mode by code.
 * Usage: modes.backlight.find(byModeCode(4))
 */
export function byModeCode (code: number) {
  return (mode: LightDomainMode) => mode.code === code
}

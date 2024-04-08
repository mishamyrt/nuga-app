import { capitalize } from '$shared/lib'
import type { light } from '$wails/go/models'

import type {
  LightDomainMode,
  LightModes
} from '../model/types'

/**
 * Converts light mode to domain mode
 */
export function modeToDomainMode (m: light.Mode): LightDomainMode {
  return {
    name: capitalize(m.name),
    supports: {
      // Features from lib/pkg/light/effect/feature.go
      specificColor: (m.features & 1) !== 0,
      randomColor: (m.features & 4) !== 0,
      speed: (m.features & 16) !== 0
    },
    code: m.code
  }
}

/**
 * Converts light domains array to light modes map
 */
export function domainsToModes (modes: light.Domain[]): LightModes {
  return modes.reduce<Record<string, any>>((acc, domain) => {
    return {
      ...acc,
      [domain.name.toLowerCase()]: domain.modes.map(modeToDomainMode)
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

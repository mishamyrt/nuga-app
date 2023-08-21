import type { AnyStore } from 'nanostores'
import { connected, device, individualSettings, osMode } from '../device'
import { backlightColors, changingColor, color, domains, state } from '../lights'
import { view } from './view'
import { updateUrl, version } from './version'
import { backgroundColor, focused, os, theme } from './window'
import { logger } from '@nanostores/logger'
import { settingsFile } from './file'

function isStore (x: any): x is AnyStore {
  return 'set' in x && 'get' in x && 'listen' in x
}

function flattenStoreMap (obj: Record<string, any>, parentKey = ''): Record<string, any> {
  let result: Record<string, any> = {}
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key
      if (typeof obj[key] === 'object' && !isStore(obj[key])) {
        const flattenedSubObject = flattenStoreMap(obj[key], newKey)
        result = { ...result, ...flattenedSubObject }
      } else {
        result[newKey] = obj[key]
      }
    }
  }
  return result
}

export function initLogger (): void {
  const loggers = {
    app: {
      view, version, updateUrl, focused, os, theme, backgroundColor, settingsFile
    },
    device: { device, connected, osMode, individualSettings },
    lights: { domains, state, color, backgroundColor, changingColor, backlightColors }
  }
  logger(flattenStoreMap(loggers))
}

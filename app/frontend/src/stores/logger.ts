import { logger } from '@nanostores/logger'
import type { AnyStore } from 'nanostores'

import { backgroundColor, focused, os, theme, view } from './app'
import { connection, mode } from './device'
import { backlightColors, changingColor, color, domains, state } from './lights'
import { updateUrl, version } from './version'

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
      view, focused, os, theme, backgroundColor
    },
    version: { version, updateUrl },
    device: { connection, mode },
    lights: { domains, state, color, backgroundColor, changingColor, backlightColors }
  }
  setTimeout(() => {
    logger(flattenStoreMap(loggers))
  }, 50)
}

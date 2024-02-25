import { shortKeyNames } from './constants'

export function getShortName (key: string): string {
  if (key.startsWith('num')) {
    return key.slice(3)
  }
  return shortKeyNames[key] ?? key.toUpperCase()
}

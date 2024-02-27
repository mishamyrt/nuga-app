import { shortKeyNames } from './constants'

export function getShortName (key: string): string {
  if (key.startsWith('num')) {
    return key.slice(3)
  }
  if (shortKeyNames[key]) {
    return shortKeyNames[key]
  }
  if (key.length <= 3) {
    return key.toUpperCase()
  }
  return ''
}

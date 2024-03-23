import { shortKeyNames } from './constants'

const prefixes = ['numpad', 'num_', 'num']

export function getShortName (key: string): string {
  if (shortKeyNames[key]) {
    return shortKeyNames[key]
  }
  for (const prefix of prefixes) {
    if (key.startsWith(prefix)) {
      return key.slice(prefix.length)
    }
  }
  if (key.length <= 3) {
    return key.toUpperCase()
  }
  return ''
}

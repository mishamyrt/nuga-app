import { shortKeyNames } from './constants'

const prefixes = ['numpad', 'num_', 'num']

export function getShortName (key: string): string {
  for (const prefix of prefixes) {
    if (key.startsWith(prefix)) {
      return key.slice(prefix.length)
    }
  }
  if (shortKeyNames[key]) {
    return shortKeyNames[key]
  }
  if (key.length <= 3) {
    return key.toUpperCase()
  }
  return ''
}

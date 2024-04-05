import { shortKeyNames } from './constants'

const prefixes = ['numpad', 'num_', 'num', 'fn_']

export function getShortName (key: string): string {
  let keyName = key
  for (const prefix of prefixes) {
    if (key.startsWith(prefix)) {
      keyName = key.slice(prefix.length)
      break
    }
  }
  if (shortKeyNames[keyName]) {
    return shortKeyNames[keyName]
  }
  if (keyName.length <= 3) {
    return keyName.toUpperCase()
  }
  return ''
}

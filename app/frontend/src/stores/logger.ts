import type { ReadableAtom } from 'nanostores'

const BOLD = 'font-weight: 700;'
const REGULAR = 'font-weight: 400;'

export function logStore (storeMap: Record<string, ReadableAtom>): void {
  for (const key in storeMap) {
    storeMap[key].listen(value => {
      // const space = `Store [2;41m${key}[0m has been changed`
      // const world = '\x1B[34;102;9mWorld';
      console.groupCollapsed(`%c✨ Store %c${key}%c has been changed`, REGULAR, BOLD, REGULAR)
      console.log(value)
      console.groupEnd()
    })
  }
}

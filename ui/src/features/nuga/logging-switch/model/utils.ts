import { attachLogger } from 'effector-logger'

let unsubscribe: (() => void) | null = null

export function setLogging (enabled: boolean) {
  if (enabled) {
    if (unsubscribe === null) {
      unsubscribe = attachLogger()
    }
  } else if (unsubscribe !== null) {
    unsubscribe()
    unsubscribe = null
  }
}

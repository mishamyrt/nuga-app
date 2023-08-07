import type { Keyboard } from '../types'
import { Halo75 } from './halo75'
import { Halo65 } from './halo65'
import { Halo96 } from './halo96'

export const layouts: Record<string, Keyboard> = {
  Halo75,
  Halo65,
  Halo96
}

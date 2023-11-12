import type { AppPage, Page } from '$entities/app'

import { device } from './device'
import { keys } from './keys'
import { lights } from './lights'

export const pages: Record<AppPage, Page> = {
  device,
  keys,
  lights
} as const

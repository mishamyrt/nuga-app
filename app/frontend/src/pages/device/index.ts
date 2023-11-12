import type { Page } from '$entities/app'

import DevicePage from './DevicePage.svelte'

export const device: Page = {
  Content: DevicePage,
  title: 'Device',
  layoutProps: {
    macInset: {
      show: true
    }
  }
} as const

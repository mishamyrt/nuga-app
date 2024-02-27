import type { Page } from '$shared/model'

import DevicePage from './DevicePage.svelte'

export const device: Page = {
  Content: DevicePage,
  title: 'Device',
  layoutProps: {
    toolbar: {
      draggable: true
    },
    macInset: {
      enable: true
    }
  }
} as const

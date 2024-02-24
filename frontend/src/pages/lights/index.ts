import type { Page } from '$shared/model'

import LightsPage from './LightsPage.svelte'
import LightsToolbar from './LightsToolbar.svelte'

export const lights: Page = {
  Content: LightsPage,
  Toolbar: LightsToolbar,
  layoutProps: {
    toolbar: {
      draggable: true,
      height: 200
    },
    macInset: {
      enable: true
    }
  }
} as const

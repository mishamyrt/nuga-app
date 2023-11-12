import type { Page } from '$shared/model'

import LightsPage from './LightsPage.svelte'
import LightsToolbar from './LightsToolbar.svelte'

export const lights: Page = {
  Content: LightsPage,
  Toolbar: LightsToolbar,
  layoutProps: {
    toolbar: {
      height: 300
    },
    macInset: {
      show: true
    }
  }
} as const

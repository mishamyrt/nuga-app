import type { Page } from '$shared/model'

import KeysPage from './KeysPage.svelte'
import KeysToolbar from './KeysToolbar.svelte'

export const keys: Page = {
  Content: KeysPage,
  Toolbar: KeysToolbar,
  layoutProps: {
    toolbar: {
      height: 200
    },
    macInset: {
      enable: true
    }
  }
} as const

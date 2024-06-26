import type { Page } from '$shared/model'

import KeysPage from './KeysPage.svelte'
import KeysToolbar from './KeysToolbar.svelte'

export const keys: Page = {
  Content: KeysPage,
  Toolbar: KeysToolbar,
  layoutProps: {
    toolbar: {
      draggable: false,
      height: 200,
      padding: 'none',
    },
    macInset: {
      enable: true,
    },
  },
} as const

import type { Page } from '$shared/model'

import KeysPage from './KeysPage.svelte'

export const keys: Page = {
  Content: KeysPage,
  title: 'Keys',
  layoutProps: {
    macInset: {
      enable: true
    }
  }
} as const

import type { Page } from '$entities/app'

import KeysPage from './KeysPage.svelte'

export const keys: Page = {
  Content: KeysPage,
  title: 'Keys',
  layoutProps: {
    macInset: {
      show: true
    }
  }
} as const

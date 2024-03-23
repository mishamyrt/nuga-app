import type { ColorScheme, OS } from '@naco-ui/svelte'

export type AppTheme = ColorScheme | 'auto'

export type AppSettings = {
  ui: OS
  theme: AppTheme
}

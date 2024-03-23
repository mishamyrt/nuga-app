import type { SidebarLayoutProps } from '@naco-ui/svelte'
import type { ComponentType, SvelteComponent } from 'svelte'

export type SupportedKeyboards =
  | 'Halo65'
  | 'Halo75'
  | 'Halo96'

export type ConnectionDescription = {
  name: string
  path: string
}

export type AppPage = 'lights' | 'keys' | 'device'

export type Page = {
  Content: ComponentType<SvelteComponent>
  Toolbar?: ComponentType<SvelteComponent>
  title?: string
  layoutProps?: SidebarLayoutProps
  gradientToolbar?: boolean
}

export enum OSMode {
  Windows = 'win',
  MacOS = 'mac'
}

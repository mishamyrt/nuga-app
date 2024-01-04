import type { SidebarLayoutProps } from '@naco-ui/svelte'
import type { ComponentType, SvelteComponent } from 'svelte'

export interface ConnectionDescription {
  name: string
  path: string
}

export type AppPage = 'lights' | 'keys' | 'device'

export interface Page {
  Content: ComponentType<SvelteComponent>
  Toolbar?: ComponentType<SvelteComponent>
  title?: string
  layoutProps?: SidebarLayoutProps
}

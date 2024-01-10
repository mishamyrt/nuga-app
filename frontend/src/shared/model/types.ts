import type { SidebarLayoutProps } from '@naco-ui/svelte'
import type { ComponentType, SvelteComponent } from 'svelte'

export type SupportedKeyboards =
  | 'Halo65'
  | 'Halo75'
  | 'Halo96'

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

export enum OSMode {
  Windows = 'win',
  MacOS = 'mac'
}

export interface ModeSettings {
  osMode: OSMode
  individual: boolean
}

export type Maybe<T> = T | null

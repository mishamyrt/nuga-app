import type { ComponentType, SvelteComponent } from 'svelte'

import type { Key } from './key'

export type KeyComponentProps = {
  key: Key
  location: [number, number]
  params?: Record<string, any>
}

export type KeyComponentType = ComponentType<SvelteComponent<KeyComponentProps>>

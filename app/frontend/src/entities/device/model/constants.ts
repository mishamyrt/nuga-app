import type { SegmentOptionProps } from '@naco-ui/svelte'

import { type ModeSettings, OSMode } from './types'

export const osModeOptions: SegmentOptionProps[] = [
  { value: 'mac' },
  { value: 'win' }
]

export const defaultOSMode: ModeSettings = {
  osMode: OSMode.MacOS,
  individual: true
}

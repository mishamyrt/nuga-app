import type { SegmentOptionProps } from '@naco-ui/svelte'

import type { CheatFeatures } from './types'

export const osModeOptions: SegmentOptionProps[] = [
  { value: 'mac' },
  { value: 'win' },
]

export const featureCheats: Record<CheatFeatures, number> = {
  keyboardThemes: 134295814,
}

export const defaultFeatures: Record<CheatFeatures, boolean> = {
  keyboardThemes: false,
}

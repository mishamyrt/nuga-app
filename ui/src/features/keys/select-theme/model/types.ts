import type { SelectOption } from '@naco-ui/svelte'

import type { KeyboardThemeName } from '$entities/keys'

export type KeyboardThemeOption = {
  value: KeyboardThemeName
} & SelectOption

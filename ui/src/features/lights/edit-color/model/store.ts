import { combine } from 'effector'

import { byModeCode, modesStore, stateStore } from '$entities/lights'

export const canEditColorStore = combine(
  [stateStore, modesStore],
  ([state, modes]) => {
    const { enabled, color, mode: code } = state.backlight
    const mode = modes.backlight.find(byModeCode(code))
    if (!mode) {
      return false
    }
    return enabled && color !== 7 && mode.supports.specificColor
  },
)

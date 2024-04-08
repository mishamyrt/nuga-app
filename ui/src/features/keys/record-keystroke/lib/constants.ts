import { type KeyAction, KeyActionType, type KeystrokeAction } from '$entities/keys'

export const defaultAction: KeyAction = {
  type: KeyActionType.None,
}

export const defaultKeystroke: KeystrokeAction = {
  type: KeyActionType.Keystroke,
  keystroke: {
    key: 'none',
    modifiers: {
      ctrl: false,
      shift: false,
      alt: false,
      meta: false,
    },
  },
}

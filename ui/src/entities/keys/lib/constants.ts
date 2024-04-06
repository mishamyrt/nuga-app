import { type Key, type KeyAction, KeyActionType, type KeyboardLayout, type KeyboardTemplate, type KeyChangesMap, type KeyMap } from '../model/types'
import { Halo65, Halo75, Halo96 } from './layouts'

export const supportedKeyboards: Record<string, KeyboardLayout> = {
  Halo75,
  Halo65,
  Halo96
} as const

export const defaultTemplate: Readonly<KeyboardTemplate> = {
  columns: 0,
  keys: []
}

export const defaultKeyAction: KeyAction = {
  type: KeyActionType.None
}

export const defaultKeyMap: KeyMap = {
  none: defaultKeyAction
}

export const defaultChangesMap: KeyChangesMap = {
  none: false
}

export const defaultKey: Key = {
  width: 1,
  height: 1,
  color: 'light',
  code: 'none',
  readonly: true
}

export const shortKeyNames: Record<string, string> = {
  lctrl: '⌃',
  rctrl: '⌃',
  lshift: '⇧',
  rshift: '⇧',
  lalt: '⌥',
  ralt: '⌥',
  lmeta: '⌘',
  lmeta_alias: '⌘',
  rmeta: '⌘',
  capslock: 'Caps',
  tab: 'Tab',
  grave: '~',
  plus: '+',
  minus: '-',
  equal: '=',
  backspace: '⌫',
  enter: '↵',
  space: '␣',
  fn: 'Fn',
  del: 'Del',
  ins: 'Ins',
  pgup: 'PgUp',
  pgdn: 'PgDn',
  home: 'Home',
  end: 'End',
  esc: 'Esc',
  left: '←',
  right: '→',
  up: '↑',
  down: '↓',
  fwdslash: '/',
  backslash: '\\',
  lbracket: '[',
  rbracket: ']',
  semicolon: ';',
  quote: "'",
  period: '.',
  comma: ',',
  screenshot: 'Scrn',
  numlock: 'Lk',
  numpad_div: '/',
  numpad_mul: '*',
  numpad_sub: '-',
  numpad_add: '+',
  numpad_enter: '↵',
  numpad_dot: '.'
}

export const codelessKeyNames: Record<string, string> = {
  fn_left: 'Fn + Left',
  fn_down: 'Fn + Down',
  fn_right: 'Fn + Right',
  fn_up: 'Fn + Up'
}

export const keyPrefixReplacements: Record<string, string> = {
  Key: '',
  Digit: 'num'
}

export const keyNameReplacements: Record<string, string> = {
  BracketLeft: 'lbracket',
  BracketRight: 'rbracket',
  ControlLeft: 'lctrl',
  ControlRight: 'rctrl',
  AltLeft: 'lalt',
  AltRight: 'ralt',
  MetaLeft: 'lmeta',
  MetaRight: 'rmeta',
  ShiftLeft: 'lshift',
  ShiftRight: 'rshift',
  Backquote: 'grave',
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowDown: 'down'
}

export const keysWithSameName = [
  'Tab',
  'Space',
  'Home',
  'Equal',
  'Minus',
  'Space',
  'Enter',
  'Delete',
  'End',
  'Backslash',
  'Backspace',
  'Slash',
  'Comma',
  'CapsLock',
  'Semicolon',
  'Quote'
]

export const hiddenGroups = new Set([
  'System',
  'Backlight'
])

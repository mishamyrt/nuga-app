import type { Key, KeyAction, KeyboardLayout, KeyboardTemplate, KeyMap } from '../model/types'
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
  key: 'none',
  modifiers: {
    ctrl: false,
    shift: false,
    alt: false,
    meta: false
  }
}

export const defaultKeyMap: KeyMap = {
  none: defaultKeyAction
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

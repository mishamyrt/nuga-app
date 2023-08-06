import type { Keyboard } from '../types'

export const Halo65: Keyboard = {
  halolight: true,
  backlight: true,
  sidelight: true,
  layout: [
    [
      { code: 'esc', color: 'mint' },
      { code: '1' },
      { code: '2' },
      { code: '3' },
      { code: '4' },
      { code: '5' },
      { code: '6' },
      { code: '7' },
      { code: '8' },
      { code: '9' },
      { code: '0' },
      { code: '-' },
      { code: '+' },
      { code: 'backspace', color: 'dark', size: 2 },
      { code: 'del', color: 'dark' }
    ],
    [
      { code: 'tab', color: 'dark', size: 1.5 },
      { code: 'q' },
      { code: 'w' },
      { code: 'e' },
      { code: 'r' },
      { code: 't' },
      { code: 'y' },
      { code: 'u' },
      { code: 'i' },
      { code: 'o' },
      { code: 'p' },
      { code: '[' },
      { code: ']' },
      { code: '\\', size: 1.5 },
      { code: 'pgup', color: 'dark' }
    ],
    [
      { code: 'caps', color: 'dark', size: 1.75 },
      { code: 'a' },
      { code: 's' },
      { code: 'd' },
      { code: 'f' },
      { code: 'g' },
      { code: 'h' },
      { code: 'j' },
      { code: 'k' },
      { code: 'l' },
      { code: ';' },
      { code: '\'' },
      { code: 'enter', size: 2.25, color: 'orange' },
      { code: 'pgdn', color: 'dark' }
    ],
    [
      { code: 'lshift', color: 'dark', size: 2.25 },
      { code: 'z' },
      { code: 'x' },
      { code: 'c' },
      { code: 'v' },
      { code: 'b' },
      { code: 'n' },
      { code: 'm' },
      { code: '<' },
      { code: '>' },
      { code: '/' },
      { code: 'rshift', color: 'dark', size: 1.75 },
      { code: 'up', color: 'dark' },
      { code: 'end', color: 'dark' }
    ],
    [
      { code: 'lctrl', color: 'dark', size: 1.25 },
      { code: 'option', color: 'dark', size: 1.25 },
      { code: 'lcmd', color: 'dark', size: 1.25 },
      { code: 'space', color: 'yellow', size: 6.25 },
      { code: 'rcmd', color: 'dark', size: 1.25 },
      { code: 'fn', color: 'dark', size: 1.25 },
      { size: 0.5 },
      { code: 'left', color: 'dark' },
      { code: 'down', color: 'dark' },
      { code: 'right', color: 'dark' }
    ]
  ]
}

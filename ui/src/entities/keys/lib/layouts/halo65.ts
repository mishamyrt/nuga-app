import type { KeyboardLayout } from '../../model/types'

export const Halo65: KeyboardLayout = [
  [
    { code: 'esc', color: 'mint' },
    { code: 'num1', secondaryCode: 'fn_num1' },
    { code: 'num2', secondaryCode: 'fn_num2' },
    { code: 'num3', secondaryCode: 'fn_num3' },
    { code: 'num4', secondaryCode: 'fn_num4' },
    { code: 'num5', secondaryCode: 'fn_num5' },
    { code: 'num6', secondaryCode: 'fn_num6' },
    { code: 'num7', secondaryCode: 'fn_num7' },
    { code: 'num8', secondaryCode: 'fn_num8' },
    { code: 'num9', secondaryCode: 'fn_num9' },
    { code: 'num0', secondaryCode: 'fn_num0' },
    { code: 'minus', secondaryCode: 'fn_minus' },
    { code: 'equal', secondaryCode: 'fn_equal' },
    { code: 'backspace', color: 'dark', width: 2 },
    { code: 'del', color: 'dark' },
  ],
  [
    { code: 'tab', color: 'dark', width: 1.5 },
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
    { code: 'lbracket' },
    { code: 'rbracket' },
    { code: 'backslash', width: 1.5 },
    { code: 'pgup', color: 'dark' },
  ],
  [
    { code: 'capslock', color: 'dark', width: 1.75 },
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
    { code: "'" },
    { code: 'enter', width: 2.25, color: 'orange' },
    { code: 'pgdn', color: 'dark' },
  ],
  [
    { code: 'lshift', color: 'dark', width: 2.25 },
    { code: 'z' },
    { code: 'x' },
    { code: 'c' },
    { code: 'v' },
    { code: 'b' },
    { code: 'n' },
    { code: 'm' },
    { code: 'comma' },
    { code: 'period' },
    { code: 'fwdslash' },
    { code: 'rshift', color: 'dark', width: 1.75 },
    { code: 'up', color: 'dark' },
    { code: 'end', color: 'dark' },
  ],
  [
    { code: 'lctrl', color: 'dark', width: 1.25 },
    { code: 'lalt', color: 'dark', width: 1.25 },
    { code: 'lmeta', color: 'dark', width: 1.25 },
    { code: 'space', color: 'yellow', width: 6.25 },
    { code: 'rmeta', color: 'dark', width: 1.25 },
    { code: 'fn', color: 'dark', width: 1.25, readonly: true },
    { width: 0.5 },
    { code: 'left', color: 'dark' },
    { code: 'down', color: 'dark' },
    { code: 'right', color: 'dark' },
  ],
]

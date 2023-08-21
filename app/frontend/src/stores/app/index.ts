
import { task } from 'nanostores'
import { initVersion } from './version'
import { initWindow } from './window'

export function initApp (): void {
  task(async () => {
    await Promise.all([
      initVersion(),
      initWindow()
    ])
  })
}

export { version, updateUrl } from './version'
export { focused, os, theme, backgroundColor, bindBackgroundColor, type OS } from './window'
export { view, type AppView } from './view'

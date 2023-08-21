
import { task } from 'nanostores'
import { initVersion, version } from './version'
import { initWindow } from './window'
import { initLogger } from '@stores/app/logger'

export function initApp (): void {
  task(async () => {
    await Promise.all([
      initVersion(),
      initWindow()
    ])
    if (version.get() === 'dev') {
      initLogger()
    }
  })
}

export { version, updateUrl } from './version'
export { focused, os, theme, backgroundColor, bindBackgroundColor, type OS } from './window'
export { view, type AppView } from './view'

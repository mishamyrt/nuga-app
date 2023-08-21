
import { task } from 'nanostores'
import { initVersion, version } from './version'
import { initWindow } from './window'
import { initLogger } from '@stores/app/logger'
import { initFile } from './file'

export function initApp (): void {
  task(async () => {
    await Promise.all([
      initVersion(),
      initWindow()
    ])
    await initFile()
    if (version.get() === 'dev') {
      initLogger()
    }
  })
}

export { version, updateUrl } from './version'
export { focused, os, theme, backgroundColor, bindBackgroundColor, type OS } from './window'
export { view, type AppView } from './view'
export { settingsFile } from './file'

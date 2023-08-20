
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
export { connected, osMode, individualSettings, setMode, type OSMode } from './keyboard'
export { focused, os, theme, backgroundColor, type OS } from './window'
export { view } from './view'

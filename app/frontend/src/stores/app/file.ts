import { computed } from 'nanostores'
import { os, theme, type OS } from './window'
import { osMode, individualSettings, type OSMode } from '@stores/device'
import { GetSettings, SetSettings } from '../../../wailsjs/go/nuga/App'

export const settingsFile = computed(
  [os, osMode, individualSettings, theme],
  (currentOS, currentOSMode, currentIndividualSettings, currentTheme) => {
    return {
      ui: currentOS,
      osMode: currentOSMode,
      individual: currentIndividualSettings,
      theme: currentTheme
    }
  })

export async function initFile (): Promise<void> {
  const settings = await GetSettings()
  if (settings) {
    os.set(settings.ui as OS)
    osMode.set(settings.osMode as OSMode)
    individualSettings.set(settings.individual)
    theme.set(settings.theme as 'light' | 'dark')
  }
  settingsFile.listen(settings => {
    SetSettings(settings)
  })
}

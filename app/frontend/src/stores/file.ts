// import { computed } from 'nanostores'
// import { os, theme, type OS } from './window'
// import { osMode, individual, type OSMode, mode } from '@stores/device'
// import { GetSettings, SetSettings } from '../../../wailsjs/go/nuga/App'

// export const settingsFile = computed(
//   [os, osMode, individual, theme],
//   (currentOS, currentOSMode, currentIndividual, currentTheme) => {
//     return {
//       ui: currentOS,
//       osMode: currentOSMode,
//       individual: currentIndividual,
//       theme: currentTheme
//     }
//   })

// export async function initFile (): Promise<void> {
//   const settings = await GetSettings()
//   if (settings) {
//     mode.set({
//       os: settings.osMode as OSMode,
//       individual: settings.individual
//     })
//     os.set(settings.ui as OS)
//     theme.set(settings.theme as 'light' | 'dark')
//   }
//   settingsFile.listen(settings => {
//     SetSettings(settings)
//   })
// }

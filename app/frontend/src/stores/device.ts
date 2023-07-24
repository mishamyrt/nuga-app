import { atom, action } from 'nanostores'
import { sleep } from '@utils/timing'
import { Connect, GetFirmware, GetPath, SimulateConnection } from '../../wailsjs/go/nuga/App.js'
import { loadDomains, loadState, loadColors } from './lights/actions'

interface ConnectedKeyboard {
  name: string
  path: string
  firmware: string
}

export const device = atom<ConnectedKeyboard>({
  name: '',
  path: '',
  firmware: ''
})

let simulation = false

export function startSimulation (): void {
  simulation = true
}

export const connect = action(device, 'connect', async store => {
  let name
  while (true) {
    if (simulation) {
      name = await SimulateConnection()
      if (name === '') {
        simulation = false
        continue
      }
    } else {
      name = await Connect()
    }
    if (name.length > 0) {
      const path = await GetPath()
      const firmware = await GetFirmware()
      store.set({
        name,
        path,
        firmware
      })
      await loadColors()
      await loadDomains()
      await loadState()
      return
    }
    await sleep(1000)
  }
})

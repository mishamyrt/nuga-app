import { atom, action } from 'nanostores'
import { sleep } from '@utils/timing'
import { Connect, GetPath, SimulateConnection } from '../../wailsjs/go/nuga/App.js'
import { loadModes, loadState, loadColors } from './lights/actions'

interface ConnectedKeyboard {
  name: string
  path: string
}

export const device = atom<ConnectedKeyboard>({
  name: '',
  path: ''
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
      store.set({
        name,
        path
      })
      await loadColors()
      await loadModes()
      await loadState()
      return
    }
    await sleep(1000)
  }
})

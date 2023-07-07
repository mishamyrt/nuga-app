import { atom, action } from 'nanostores'
import { Connect, GetPath, SimulateConnection } from '../../wailsjs/go/main/App.js'
import { sleep } from '../utils/timing'
import { loadModes, loadState, loadColors } from './lights/actions'

interface ConnectedKeyboard {
  name: string
  path: string
}

export const device = atom<ConnectedKeyboard>({
  name: '',
  path: '',
})

let simulation = false

export async function startSimulation() {
  simulation = true
}

export const connect = action(device, 'connect', async store => {
  let name
  while (true) {
    if (simulation) {
      name = await SimulateConnection()
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
    await sleep(2000)
  }
})

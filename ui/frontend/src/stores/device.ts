import { atom, action } from 'nanostores'
import { Connect, SimulateConnection } from '../../wailsjs/go/main/App.js'
import { sleep } from '../utils/timing'
import { loadModes, loadState, loadColors } from './lights/actions'

interface ConnectedKeyboard {
  name: string
  md5: string
}

export const device = atom<ConnectedKeyboard>({
  name: '',
  md5: '',
})

export function setName(name: string) {
  device.set({
    ...device.get(),
    name
  });
}

export function setMD5(md5: string) {
  device.set({
    ...device.get(),
    md5
  });
}

let simulation = false

export async function startSimulation() {
  await SimulateConnection()
  simulation = true
}

export const connect = action(device, 'connect', async store => {
  while (true) {
    if (simulation) {
      return
    }
    const name = await Connect()
    if (name.length > 0) {
      store.set({
        ...store.get(),
        name: name,
      })
      await loadColors()
      await loadModes()
      await loadState()
      return
    }
    await sleep(2000)
  }
})

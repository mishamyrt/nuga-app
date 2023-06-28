import { atom, computed, action } from 'nanostores'
import { Connect } from '../../wailsjs/go/main/App.js'
import { sleep } from '../utils/timing.js'
import { fetchModes, fetchState } from './lights'

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

export const connect = action(device, 'connect', async store => {
  while (true) {
    const name = await Connect()
    if (name.length > 0) {
      store.set({
        ...store.get(),
        name: name,
      })
      await fetchModes()
      await fetchState()
      return
    }
    await sleep(2000)
  }
})

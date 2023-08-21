import { atom, computed } from 'nanostores'
import { sleep } from '@utils/timing'
import { Connect, GetFirmware, GetPath, SimulateConnection } from '../../../wailsjs/go/nuga/App.js'
import { loadDomains, loadState, loadColors } from '../lights/actions'
import type { ConnectionDescription } from './types'

export const device = atom<ConnectionDescription | undefined>()

export const connected = computed(device, Boolean)

export async function initDevice (name: string): Promise<void> {
  const path = await GetPath()
  const firmware = await GetFirmware()
  device.set({
    name,
    path,
    firmware
  })
  await Promise.all([
    loadColors(),
    loadDomains()
  ])
  await loadState()
}

let simulation = false
let connecting = false

export function startSimulation (): void {
  simulation = true
}

export async function connect (): Promise<void> {
  let name = ''
  connecting = true
  while (connecting) {
    if (simulation) {
      name = await SimulateConnection()
      if (name === '') {
        simulation = false
        continue
      }
    } else {
      name = await Connect()
    }
    if (name.length === 0) {
      await sleep(1000)
      continue
    }
    await initDevice(name)
    connecting = false
  }
}

export function disconnect (): void {
  connecting = false
  device.set(undefined)
}

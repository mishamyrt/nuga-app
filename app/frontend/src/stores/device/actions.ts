import { action } from 'nanostores'
import { sleep } from '@utils/timing'
import { Connect, GetFirmware, GetPath, SimulateConnection } from '@wailsjs/go/nuga/App'
import { loadDomains, loadState, loadColors } from '../lights/actions'
import { connection, mode } from './atoms'
import type { OSMode } from './types'

let simulation = false
let connecting = false

async function initDevice (name: string, store: typeof connection): Promise<void> {
  const path = await GetPath()
  const firmware = await GetFirmware()
  store.set({
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

export const connect = action(connection, 'connect', async (store) => {
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
    await initDevice(name, store)
    connecting = false
  }
})

export const disconnect = action(connection, 'disconnect', async store => {
  connecting = false
  store.set(undefined)
})

export const startSimulation = action(connection, 'startSimulation', () => {
  simulation = true
})

export const setOS = action(mode, 'setOS', (store, os: OSMode) => {
  store.setKey('os', os)
})

export const setIndividual = action(mode, 'setIndividual', (store, individual: boolean) => {
  store.setKey('individual', individual)
})

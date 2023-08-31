import { sleep } from '@utils/timing'
import { Connect, GetFirmware, GetPath, SimulateConnection } from '@wailsjs/go/nuga/App'
import { onMount, task } from 'nanostores'

import { connection, mode } from './atoms'
import type { OSMode } from './types'

let simulation = false
let connecting = false

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
    const path = await GetPath()
    const firmware = await GetFirmware()
    connection.set({
      name,
      path,
      firmware
    })
    connecting = false
  }
}

export async function disconnect (): Promise<void> {
  connecting = false
  connection.set(undefined)
}

export function startSimulation (): void {
  simulation = true
}

export function setOS (os: OSMode): void {
  mode.setKey('os', os)
}

export function setIndividual (individual: boolean): void {
  mode.setKey('individual', individual)
}

onMount(connection, () => {
  task(async () => {
    await connect()
  })
})

import { Connect, Disconnect, GetPath, SimulateConnection } from '$wails/go/usecase/DeviceUsecase'

import type { ConnectionDescription } from '../model'

export async function connect (): Promise<ConnectionDescription> {
  const name = await Connect()
  if (!name) {
    throw new Error('Device is not found')
  }
  const path = await GetPath()
  return {
    name,
    path
  }
}

export async function disconnect (): Promise<void> {
  await Disconnect()
}

export async function simulate (): Promise<ConnectionDescription> {
  const name = await SimulateConnection()
  if (!name) {
    throw new Error('Simulation data is not available')
  }
  const path = await GetPath()
  return {
    name,
    path
  }
}

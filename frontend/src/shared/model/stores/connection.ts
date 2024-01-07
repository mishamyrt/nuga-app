import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { interval } from 'patronum'

import { connect, disconnect, simulate } from '../../api'
import type { ConnectionDescription } from '../types'

const defaultConnection: ConnectionDescription = {
  path: '',
  name: ''
}

export const started = createEvent('started')

export const disconnected = createEvent('disconnected')
export const connecting = createEvent('connecting')
export const connected = createEvent<ConnectionDescription>('connected')
export const connectionStore = createStore<ConnectionDescription>(defaultConnection, {
  name: 'connectionStore'
})
export const isConnected = combine(connectionStore, c => c.name.length > 0)

sample({
  clock: [started],
  target: connecting
})

const { tick } = interval({
  timeout: 1000,
  start: connecting,
  stop: connected,
  leading: true
})

export const connectFx = createEffect('connectFx', {
  handler: connect
})
export const disconnectFx = createEffect('disconnectFx', {
  handler: disconnect
})

sample({
  clock: tick,
  target: connectFx
})

sample({
  clock: connectFx.doneData,
  target: connected
})

sample({
  clock: disconnected,
  target: disconnectFx
})

export const simulating = createEvent('simulating')
export const simulateFx = createEffect(simulate)

sample({
  clock: simulating,
  target: simulateFx
})

connectionStore.on([connected, simulateFx.doneData], (_, data) => data)

sample({
  clock: disconnectFx.done,
  fn: () => defaultConnection,
  target: [connectionStore, connecting]
})

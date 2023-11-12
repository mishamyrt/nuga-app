import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { interval } from 'patronum'

import { connect, simulate } from '../api'
import type { ConnectionDescription } from './types'

const defaultConnection: ConnectionDescription = {
  path: '',
  name: ''
}

export const started = createEvent('started')

export const disconnected = createEvent('disconnected')
export const connecting = createEvent('connecting')
export const connected = createEvent<ConnectionDescription>('connected')
export const connection = createStore<ConnectionDescription>(defaultConnection, {
  name: 'connection'
})
export const isConnected = combine(connection, c => c.name.length > 0)

sample({
  clock: [started, disconnected],
  target: connecting
})

const { tick } = interval({
  timeout: 1000,
  start: connecting,
  stop: connected,
  leading: true
})

export const connectFx = createEffect(connect)

sample({
  clock: tick,
  target: connectFx
})

sample({
  clock: connectFx.doneData,
  target: connected
})

export const simulating = createEvent('simulating')
export const simulateFx = createEffect(simulate)

sample({
  clock: simulating,
  target: simulateFx
})

connection.on([connected, simulateFx.doneData], (_, data) => data)
connection.on(disconnected, () => defaultConnection)

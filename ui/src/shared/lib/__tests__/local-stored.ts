import { getUniqueId } from '@naco-ui/svelte'
import { allSettled, createEvent, createStore, fork } from 'effector'
import { describe, expect, it } from 'vitest'

import { attachStorage } from '../local-stored'

const getTestId = () => getUniqueId('test')

describe('attachStorage', () => {
  it('should attach storage', () => {
    fork()
    const key = getTestId()
    const store = createStore(0)
    expect(attachStorage({
      source: store,
      key
    })).toBeUndefined()
    localStorage.removeItem(key)
  })

  it('should write storage', () => {
    fork()
    const key = getTestId()
    const valueUpdated = createEvent<number>('setValue')
    const store = createStore(0)
      .on(valueUpdated, (_, value) => value)
    attachStorage({
      source: store,
      key
    })
    valueUpdated(1)
    expect(localStorage.getItem(key)).toBe('1')
    localStorage.removeItem(key)
  })

  it('should read storage', async () => {
    const scope = fork()
    const store = createStore(0)
    const key = getTestId()
    localStorage.setItem(key, '1')
    attachStorage({
      source: store,
      key
    })
    await allSettled<number>(store, { scope, params: 0 })
    expect(store.getState()).toBe(1)
  })

  it('should read stored object', async () => {
    const scope = fork()
    const key = getTestId()
    const store = createStore({
      value: 0
    })
    localStorage.setItem(key, '{"value": 1}')
    attachStorage({
      source: store,
      key
    })
    await allSettled(store, { scope, params: { value: 0 } })
    expect(store.getState()).toEqual({ value: 1 })
  })

  it('should write stored object', async () => {
    const key = getTestId()
    const valueUpdated = createEvent<{ value: number }>('setValue')
    const store = createStore({
      value: 0
    })
      .on(valueUpdated, (_, value) => value)
    attachStorage({
      source: store,
      key
    })
    valueUpdated({ value: 1 })
    expect(localStorage.getItem(key)).toEqual('{"value":1}')
    localStorage.removeItem(key)
  })
})

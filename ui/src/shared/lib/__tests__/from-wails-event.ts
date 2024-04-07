/* eslint-disable @typescript-eslint/consistent-type-imports */
import { allSettled, fork } from 'effector'
import { describe, expect, it, vi } from 'vitest'

import * as mod from '$wails/runtime'

import { fromWailsEvent } from '../from-wails-event'

const events = new Map<string, (...args: any[]) => void>()

vi.spyOn(mod, 'EventsOn')
vi.mock('$wails/runtime', async (importOriginal) => {
  return {
    ...await importOriginal<typeof import('$wails/runtime')>(),
    EventsOn: (eventName: string, cb: (...args: any[]) => void) => {
      events.set(eventName, cb)
    }
  }
})

function mockEmitEvent (eventName: string, ...data: any[]) {
  events.get(eventName)?.(...data)
}

describe('fromWailsEvent', () => {
  it('should call EventsOn', () => {
    const eventName = 'test'
    const cb = vi.fn()
    fromWailsEvent(eventName, { fn: cb })
    expect(mod.EventsOn).toHaveBeenCalled()
  })

  it('should call event if wails event is fired', async (): Promise<void> => {
    const scope = fork()
    const eventName = 'foo'
    const cb = vi.fn()
    fromWailsEvent(eventName, { fn: cb })
    mockEmitEvent(eventName)
    await allSettled(scope)
    expect(cb).toBeCalled()
  })

  it('should not call event if wails event is not fired', () => {
    const eventName = 'bar'
    const cb = vi.fn()
    fromWailsEvent(eventName, { fn: cb })
    expect(cb).not.toBeCalled()
  })

  it('should pass correct data to event', () => {
    const eventName = 'data'
    const payload = {
      value: 'test'
    }
    const cb = vi.fn()
    fromWailsEvent(eventName, { fn: cb })
    mockEmitEvent(eventName, payload)
    expect(cb).toBeCalledWith(payload)
  })
})

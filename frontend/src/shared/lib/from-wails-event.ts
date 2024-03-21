import { createEvent, type Event } from 'effector'

import { EventsOn } from '$wailsjs/runtime'

type WailsEventHandlerFn<T> = (...params: any[]) => T

type FromWailsEventConfig<T> = {
  name?: string
  fn?: WailsEventHandlerFn<T>
}

/**
 * Creates Effector event from Wails runtime event
 * @see {@link https://wails.io/docs/reference/runtime/events}
 */
export function fromWailsEvent<T> (
  wailsEventName: string,
  config?: FromWailsEventConfig<T>
): Event<T> {
  const mapFn = config?.fn
  const eventName = config?.name
  const event = createEvent<T>(eventName)
  EventsOn(wailsEventName, (...data: any) => {
    const params = mapFn
      ? mapFn(...data)
      : data
    event(params)
  })
  return event
}

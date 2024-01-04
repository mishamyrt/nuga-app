import { createEvent, type Event } from 'effector'

import { EventsOn } from '$wailsjs/runtime'

type WailsEventHandlerFn<T> = (...params: any[]) => T

export function fromWailsEvent<T> (
  eventName: string,
  handler: WailsEventHandlerFn<T>
): Event<T> {
  const event = createEvent<T>()
  EventsOn(eventName, (...data: any) => {
    event(handler(...data))
  })
  return event
}

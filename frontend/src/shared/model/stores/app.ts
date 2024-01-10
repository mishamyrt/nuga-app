import { createEffect, createEvent, sample } from 'effector'

import { restartApp } from '../../api/app'

export const appStarted = createEvent('appStarted')
export const appRestarted = createEvent('appRestarted')

const restartAppFx = createEffect('restartAppFx', { handler: restartApp })

sample({
  clock: appRestarted,
  target: restartAppFx
})

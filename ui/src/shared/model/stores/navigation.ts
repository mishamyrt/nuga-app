import { createEvent, createStore } from 'effector'

import type { AppPage } from '../types'

export const pageChanged = createEvent<AppPage>('pageChanged')

export const activePage = createStore<AppPage>('lights', {
  name: 'activePage',
})

activePage.on(pageChanged, (_, view) => view)

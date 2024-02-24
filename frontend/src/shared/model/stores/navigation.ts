import { createEvent, createStore } from 'effector'

import type { AppPage } from '../types'

export const pageChanged = createEvent<AppPage>('changedPage')

export const activePage = createStore<AppPage>('keys', {
  name: 'activePage'
})

activePage.on(pageChanged, (_, view) => view)

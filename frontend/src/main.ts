import './style.css'

import { appStarted } from '$shared/model'

import { App } from './app'

appStarted()

const target = document.getElementById('app')
if (!target) {
  throw new Error('#app node is not found')
}
const app = new App({ target })

export default app

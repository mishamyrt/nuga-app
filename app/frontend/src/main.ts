import './style.css'

import { attachLogger } from 'effector-logger'

import { started } from '$shared/model'

import App from './app/App.svelte'

attachLogger()
started()

const target = document.getElementById('app')
if (!target) {
  throw new Error('#app node is not found')
}
const app = new App({ target })

export default app

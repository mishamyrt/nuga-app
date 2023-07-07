import './style.css'
import './form.scss'
import App from './App.svelte'

const target = document.getElementById('app')
if (!target) {
  throw new Error('#app node is not found')
}
const app = new App({ target })

export default app

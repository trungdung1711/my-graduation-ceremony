import '98.css'
import './styles.css'
import { renderApp } from './render'
import { mountDesktop } from './window-manager'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root element')
}

app.innerHTML = renderApp()
const desktop = mountDesktop(app)

requestAnimationFrame(() => {
  desktop.openApp('invitation')
})

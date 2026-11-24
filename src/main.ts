import './styles.css'
import { renderApp } from './render'
import { mountTabs } from './tabs'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root element')
}

app.innerHTML = renderApp()
mountTabs(app)

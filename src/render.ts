import { apps } from './apps'
import type { AppDefinition } from './apps'
import { icons } from './icons'

function renderDesktopIcon(app: AppDefinition): string {
  return `
    <button class="desktop-icon" type="button" data-open-app="${app.id}" aria-label="Mở ${app.label}">
      <span class="desktop-icon-image" aria-hidden="true">${icons[app.icon]}</span>
      <span class="desktop-icon-label">${app.label}</span>
    </button>
  `
}

function renderStartMenuItem(app: AppDefinition): string {
  return `
    <button class="start-menu-item" type="button" data-open-app="${app.id}">
      <span class="start-menu-icon" aria-hidden="true">${icons[app.icon]}</span>
      <span>${app.label}</span>
    </button>
  `
}

export function renderTaskbarButton(app: AppDefinition): string {
  return `
    <span class="taskbar-app-icon" aria-hidden="true">${icons[app.icon]}</span>
    <span class="taskbar-app-label">${app.label}</span>
  `
}

export function renderWindow(app: AppDefinition): string {
  return `
    <section class="window app-window" data-app="${app.id}" aria-labelledby="window-title-${app.id}" tabindex="-1">
      <div class="title-bar" data-drag-handle>
        <div class="title-bar-text" id="window-title-${app.id}">
          <span class="title-bar-icon" aria-hidden="true">${icons[app.icon]}</span>
          <span>${app.title}</span>
        </div>
        <div class="title-bar-controls">
          <button type="button" aria-label="Minimize" data-window-action="minimize"></button>
          <button type="button" aria-label="Maximize" data-window-action="maximize"></button>
          <button type="button" aria-label="Close" data-window-action="close"></button>
        </div>
      </div>
      <div class="window-body app-window-body">${app.content}</div>
      <div class="status-bar">
        <p class="status-bar-field">${app.status}</p>
      </div>
    </section>
  `
}

export function renderApp(): string {
  return `
    <main class="desktop" id="desktop">
      <div class="desktop-icons" aria-label="Applications">
        ${apps.map(renderDesktopIcon).join('')}
      </div>

      <div class="window-layer" id="window-layer"></div>

      <nav class="start-menu" id="start-menu" aria-label="Start menu" hidden>
        <div class="start-menu-items">
          ${apps.map(renderStartMenuItem).join('')}
        </div>
      </nav>

      <div class="taskbar" role="toolbar" aria-label="Taskbar">
        <button
          class="start-button"
          id="start-button"
          type="button"
          aria-expanded="false"
          aria-controls="start-menu"
        >
          <span class="start-logo" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <span class="start-label">Start</span>
        </button>
        <div class="taskbar-divider" aria-hidden="true"></div>
        <div class="taskbar-apps" id="taskbar-apps" aria-label="Open applications"></div>
        <div class="taskbar-clock" id="taskbar-clock" aria-label="Current time"></div>
      </div>
    </main>
  `
}

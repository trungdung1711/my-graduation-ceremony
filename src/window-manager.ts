import { getApp } from './apps'
import type { AppDefinition, AppId } from './apps'
import { icons } from './icons'
import { renderTaskbarButton, renderWindow } from './render'

interface RestoreRect {
  left: number
  top: number
  width: number
}

interface WindowState {
  app: AppDefinition
  element: HTMLElement
  taskbarButton: HTMLButtonElement
  minimized: boolean
  maximized: boolean
  zIndex: number
  restoreRect: RestoreRect | null
}

export interface DesktopApi {
  openApp: (id: string) => void
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function isMobileViewport(): boolean {
  return window.matchMedia('(max-width: 720px)').matches
}

function queryElement<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector)

  if (!element) {
    throw new Error(`Desktop markup is incomplete: missing ${selector}`)
  }

  return element
}

export function mountDesktop(root: HTMLElement): DesktopApi {
  const layer = queryElement<HTMLElement>(root, '#window-layer')
  const taskbarApps = queryElement<HTMLElement>(root, '#taskbar-apps')
  const startButton = queryElement<HTMLButtonElement>(root, '#start-button')
  const startMenu = queryElement<HTMLElement>(root, '#start-menu')
  const clock = queryElement<HTMLElement>(root, '#taskbar-clock')

  const windows = new Map<AppId, WindowState>()
  let zIndex = 10
  let activeId: AppId | null = null

  function getTopmostOpen(): WindowState | undefined {
    let topmost: WindowState | undefined

    windows.forEach((state) => {
      if (state.minimized) return
      if (!topmost || state.zIndex > topmost.zIndex) topmost = state
    })

    return topmost
  }

  function setActive(id: AppId | null): void {
    activeId = id

    windows.forEach((state, windowId) => {
      const isActive = windowId === id
      state.element.classList.toggle('is-active', isActive)
      state.element.querySelector('.title-bar')?.classList.toggle('inactive', !isActive)
      state.taskbarButton.classList.toggle('is-active', isActive)
      state.taskbarButton.setAttribute('aria-pressed', String(isActive))
    })
  }

  function focusWindow(id: AppId, focusContent = true): void {
    const state = windows.get(id)
    if (!state) return

    if (state.minimized) {
      state.minimized = false
      state.element.classList.remove('is-minimized')
    }

    zIndex += 1
    state.zIndex = zIndex
    state.element.style.zIndex = String(zIndex)
    setActive(id)

    if (focusContent) {
      state.element.focus({ preventScroll: true })
    }
  }

  function focusDesktopIcon(id: AppId): void {
    root.querySelector<HTMLButtonElement>(`.desktop-icon[data-open-app="${id}"]`)?.focus()
  }

  function positionWindow(state: WindowState): void {
    const margin = 8
    const maxWidth = Math.max(240, layer.clientWidth - margin * 2)
    const cascade = (windows.size - 1) * 24 % 96

    state.element.style.width = `${Math.min(state.app.width, maxWidth)}px`
    state.element.style.left = '0px'
    state.element.style.top = '0px'

    const rect = state.element.getBoundingClientRect()
    const maxLeft = Math.max(margin, layer.clientWidth - rect.width - margin)
    const maxTop = Math.max(margin, layer.clientHeight - rect.height - margin)
    const left = clamp((layer.clientWidth - rect.width) / 2 + cascade - 24, margin, maxLeft)
    const top = clamp((layer.clientHeight - rect.height) / 2 + cascade - 24, margin, maxTop)

    state.element.style.left = `${Math.round(left)}px`
    state.element.style.top = `${Math.round(top)}px`
  }

  function createTaskbarButton(app: AppDefinition): HTMLButtonElement {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'taskbar-app'
    button.dataset.app = app.id
    button.title = app.title
    button.setAttribute('aria-label', app.label)
    button.setAttribute('aria-pressed', 'false')
    button.innerHTML = renderTaskbarButton(app)

    button.addEventListener('click', () => {
      const state = windows.get(app.id)
      if (!state) return

      if (state.minimized) {
        focusWindow(app.id)
        return
      }

      if (activeId === app.id) {
        minimizeWindow(app.id)
        return
      }

      focusWindow(app.id)
    })

    return button
  }

  function minimizeWindow(id: AppId): void {
    const state = windows.get(id)
    if (!state || state.minimized) return

    state.minimized = true
    state.element.classList.add('is-minimized')

    if (activeId === id) {
      setActive(null)
      const topmost = getTopmostOpen()
      if (topmost) focusWindow(topmost.app.id, false)
    }
  }

  function closeWindow(id: AppId): void {
    const state = windows.get(id)
    if (!state) return

    state.element.remove()
    state.taskbarButton.remove()
    windows.delete(id)

    if (activeId === id) {
      setActive(null)
      const topmost = getTopmostOpen()

      if (topmost) {
        focusWindow(topmost.app.id)
      } else {
        focusDesktopIcon(id)
      }
    }
  }

  function toggleMaximize(id: AppId): void {
    const state = windows.get(id)
    if (!state || isMobileViewport()) return

    const maximizeButton = state.element.querySelector<HTMLButtonElement>(
      '[data-window-action="maximize"]',
    )

    if (state.maximized) {
      state.maximized = false
      state.element.classList.remove('is-maximized')

      if (state.restoreRect) {
        state.element.style.left = `${state.restoreRect.left}px`
        state.element.style.top = `${state.restoreRect.top}px`
        state.element.style.width = `${state.restoreRect.width}px`
      }

      maximizeButton?.setAttribute('aria-label', 'Maximize')
    } else {
      state.restoreRect = {
        left: Number.parseFloat(state.element.style.left) || 0,
        top: Number.parseFloat(state.element.style.top) || 0,
        width: state.element.offsetWidth,
      }
      state.maximized = true
      state.element.classList.add('is-maximized')
      maximizeButton?.setAttribute('aria-label', 'Restore')
    }

    focusWindow(id, false)
  }

  function startDrag(state: WindowState, event: PointerEvent): void {
    if (event.button !== 0 || isMobileViewport() || state.maximized) return
    if (event.target instanceof Element && event.target.closest('button')) return

    const titleBar = event.currentTarget
    if (!(titleBar instanceof HTMLElement)) return

    const layerRect = layer.getBoundingClientRect()
    const elementRect = state.element.getBoundingClientRect()
    const startLeft = elementRect.left - layerRect.left
    const startTop = elementRect.top - layerRect.top
    const maxLeft = Math.max(0, layer.clientWidth - state.element.offsetWidth)
    const maxTop = Math.max(0, layer.clientHeight - state.element.offsetHeight)

    state.element.style.left = `${startLeft}px`
    state.element.style.top = `${startTop}px`

    const move = (moveEvent: PointerEvent): void => {
      if (moveEvent.pointerId !== event.pointerId) return

      const left = clamp(startLeft + moveEvent.clientX - event.clientX, 0, maxLeft)
      const top = clamp(startTop + moveEvent.clientY - event.clientY, 0, maxTop)
      state.element.style.left = `${Math.round(left)}px`
      state.element.style.top = `${Math.round(top)}px`
    }

    const end = (endEvent: PointerEvent): void => {
      if (endEvent.pointerId !== event.pointerId) return

      titleBar.removeEventListener('pointermove', move)
      titleBar.removeEventListener('pointerup', end)
      titleBar.removeEventListener('pointercancel', end)
      titleBar.removeEventListener('lostpointercapture', end)
      document.body.classList.remove('is-dragging')
    }

    titleBar.setPointerCapture(event.pointerId)
    titleBar.addEventListener('pointermove', move)
    titleBar.addEventListener('pointerup', end)
    titleBar.addEventListener('pointercancel', end)
    titleBar.addEventListener('lostpointercapture', end)
    document.body.classList.add('is-dragging')
    event.preventDefault()
    focusWindow(state.app.id, false)
  }

  function bindWindow(state: WindowState): void {
    const { app, element } = state
    const titleBar = element.querySelector<HTMLElement>('[data-drag-handle]')

    element.addEventListener('pointerdown', () => {
      focusWindow(app.id, false)
    })

    titleBar?.addEventListener('pointerdown', (event) => {
      startDrag(state, event)
    })

    titleBar?.addEventListener('dblclick', (event) => {
      if (event.target instanceof Element && event.target.closest('button')) return
      toggleMaximize(app.id)
    })

    element.querySelectorAll<HTMLButtonElement>('[data-window-action]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation()
        const action = button.dataset.windowAction

        if (action === 'minimize') minimizeWindow(app.id)
        if (action === 'maximize') toggleMaximize(app.id)
        if (action === 'close') closeWindow(app.id)
      })
    })
  }

  function openApp(id: string): void {
    const app = getApp(id)
    if (!app) return

    const existing = windows.get(app.id)
    if (existing) {
      focusWindow(app.id)
      return
    }

    const template = document.createElement('template')
    template.innerHTML = renderWindow(app).trim()
    const element = template.content.firstElementChild

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Could not render app window: ${app.id}`)
    }

    layer.appendChild(element)

    const taskbarButton = createTaskbarButton(app)
    taskbarApps.appendChild(taskbarButton)

    const state: WindowState = {
      app,
      element,
      taskbarButton,
      minimized: false,
      maximized: false,
      zIndex: 0,
      restoreRect: null,
    }

    windows.set(app.id, state)
    bindWindow(state)
    positionWindow(state)
    focusWindow(app.id)
  }

  function openStartMenu(): void {
    startMenu.hidden = false
    startButton.setAttribute('aria-expanded', 'true')
    startButton.classList.add('is-open')
    startMenu.querySelector<HTMLButtonElement>('.start-menu-item')?.focus()
  }

  function closeStartMenu(restoreFocus = false): void {
    if (startMenu.hidden) return

    startMenu.hidden = true
    startButton.setAttribute('aria-expanded', 'false')
    startButton.classList.remove('is-open')

    if (restoreFocus) startButton.focus()
  }

  function updateClock(): void {
    clock.textContent = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date())
  }

  startButton.addEventListener('click', () => {
    if (startMenu.hidden) {
      openStartMenu()
    } else {
      closeStartMenu(true)
    }
  })

  root.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return

    const trigger = event.target.closest<HTMLElement>('[data-open-app]')
    const id = trigger?.dataset.openApp
    if (!trigger || !id) return

    openApp(id)

    if (startMenu.contains(trigger)) {
      closeStartMenu()
    }
  })

  document.addEventListener('pointerdown', (event) => {
    if (startMenu.hidden || !(event.target instanceof Node)) return
    if (startMenu.contains(event.target) || startButton.contains(event.target)) return
    closeStartMenu()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !startMenu.hidden) {
      closeStartMenu(true)
    }
  })

  window.addEventListener('resize', () => {
    if (isMobileViewport()) return

    windows.forEach((state) => {
      if (state.maximized) return

      const maxLeft = Math.max(0, layer.clientWidth - state.element.offsetWidth)
      const maxTop = Math.max(0, layer.clientHeight - state.element.offsetHeight)
      const left = clamp(Number.parseFloat(state.element.style.left) || 0, 0, maxLeft)
      const top = clamp(Number.parseFloat(state.element.style.top) || 0, 0, maxTop)

      state.element.style.left = `${Math.round(left)}px`
      state.element.style.top = `${Math.round(top)}px`
    })
  })

  updateClock()
  window.setInterval(updateClock, 15_000)

  return { openApp }
}

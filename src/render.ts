import { content, tabs } from './content'
import type { Tab } from './content'

function renderTabButton(tab: Tab, index: number): string {
  const isActive = index === 0

  return `<button class="tab${isActive ? ' active' : ''}" data-tab="${tab.id}" type="button" aria-selected="${isActive}"><span>${tab.icon}</span><b>${tab.label}</b></button>`
}

export function renderApp(): string {
  const initialTab = tabs[0]

  return `
  <main class="scene">
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>

    <section class="computer-wrap" aria-label="Graduation invitation computer">
      <div class="computer">
        <div class="monitor">
          <div class="monitor-top">
            <div class="brand"><span class="brand-dot"></span> GRADUATION.EXE</div>
            <div class="window-controls" aria-hidden="true"><i></i><i></i><i></i></div>
          </div>
          <div class="screen">
            <nav class="tabs" aria-label="Invitation sections">
              ${tabs.map(renderTabButton).join('')}
            </nav>
            <section class="screen-content" id="tab-content" aria-live="polite">
              ${content[initialTab.id]}
            </section>
            <footer class="screen-footer"><span><i class="status-dot"></i> SYSTEM READY</span><span data-tab-counter>1 / ${tabs.length}</span></footer>
          </div>
        </div>
        <div class="chin"><span class="chin-mark">✳</span><span class="chin-name">p i x e l b o o k</span><span class="power-light"></span></div>
        <div class="neck"></div>
        <div class="base"><div class="base-line"></div></div>
      </div>
    </section>
  </main>
`
}

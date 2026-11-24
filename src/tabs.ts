import { content, tabs } from './content'
import type { TabId } from './content'

export function mountTabs(root: ParentNode): void {
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('.tab')]
  const tabContent = root.querySelector<HTMLElement>('#tab-content')
  const footerCount = root.querySelector<HTMLElement>('[data-tab-counter]')

  if (!tabContent || !footerCount) {
    throw new Error('Tab markup is incomplete: missing content panel or counter')
  }

  const selectTab = (id: TabId, index: number): void => {
    buttons.forEach((button) => {
      const selected = button.dataset.tab === id
      button.classList.toggle('active', selected)
      button.setAttribute('aria-selected', String(selected))
    })

    tabContent.classList.remove('enter')
    // Trigger a reflow so the transition can replay on every tab change.
    void tabContent.offsetWidth
    tabContent.innerHTML = content[id]
    tabContent.classList.add('enter')
    footerCount.textContent = `${index + 1} / ${tabs.length}`
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = tabs.findIndex((tab) => tab.id === button.dataset.tab)
      if (index === -1) return

      selectTab(tabs[index].id, index)
    })
  })
}

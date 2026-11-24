const invitation = `
  <svg viewBox="0 0 32 32" shape-rendering="crispEdges" focusable="false" aria-hidden="true">
    <rect x="3" y="7" width="26" height="19" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <path d="M4 8l12 10L28 8" fill="none" stroke="#000000" stroke-width="2" />
    <path d="M5 24l8-7M27 24l-8-7" fill="none" stroke="#808080" />
    <rect x="15" y="18" width="2" height="2" fill="#800000" />
  </svg>
`

const schedule = `
  <svg viewBox="0 0 32 32" shape-rendering="crispEdges" focusable="false" aria-hidden="true">
    <rect x="5" y="5" width="22" height="23" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <rect x="7" y="7" width="18" height="6" fill="#000080" />
    <rect x="8" y="3" width="2" height="5" fill="#c0c0c0" stroke="#000000" />
    <rect x="22" y="3" width="2" height="5" fill="#c0c0c0" stroke="#000000" />
    <rect x="8" y="16" width="5" height="4" fill="#c0c0c0" />
    <rect x="14" y="16" width="5" height="4" fill="#c0c0c0" />
    <rect x="20" y="16" width="4" height="4" fill="#c0c0c0" />
    <rect x="8" y="22" width="5" height="4" fill="#c0c0c0" />
    <rect x="14" y="22" width="5" height="4" fill="#000080" />
    <rect x="20" y="22" width="4" height="4" fill="#c0c0c0" />
  </svg>
`

const contact = `
  <svg viewBox="0 0 32 32" shape-rendering="crispEdges" focusable="false" aria-hidden="true">
    <rect x="5" y="4" width="22" height="24" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <rect x="6" y="5" width="5" height="22" fill="#c0c0c0" stroke="#000000" />
    <rect x="8" y="9" width="2" height="2" fill="#808080" />
    <rect x="8" y="15" width="2" height="2" fill="#808080" />
    <rect x="8" y="21" width="2" height="2" fill="#808080" />
    <rect x="13" y="8" width="11" height="16" fill="#ffffff" stroke="#808080" />
    <rect x="16" y="11" width="5" height="4" fill="#000080" />
    <rect x="14" y="16" width="9" height="6" fill="#000080" />
  </svg>
`

const note = `
  <svg viewBox="0 0 32 32" shape-rendering="crispEdges" focusable="false" aria-hidden="true">
    <rect x="5" y="3" width="22" height="26" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <path d="M21 4h5v5" fill="#c0c0c0" stroke="#000000" stroke-width="2" />
    <rect x="8" y="8" width="12" height="2" fill="#000080" />
    <rect x="8" y="13" width="16" height="1" fill="#808080" />
    <rect x="8" y="17" width="16" height="1" fill="#808080" />
    <rect x="8" y="21" width="12" height="1" fill="#808080" />
    <rect x="8" y="25" width="8" height="1" fill="#808080" />
  </svg>
`

export const icons = {
  invitation,
  schedule,
  contact,
  note,
} as const

export type IconName = keyof typeof icons

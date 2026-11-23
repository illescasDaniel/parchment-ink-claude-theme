import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Parchment & Ink: Flexoki-inspired. Warm yellowed paper with near-black text by day;
// true-ish black with a faint warm tint and soft white text by night.
const { theme, problems } = makeColors({
  label: 'Parchment & Ink',
  roles: { accent: '#1f7a78', danger: '#b02f2a', success: '#5b7a10', warning: '#a87a05', pro: '#6a4aa8' },
  light: {
    roles: { accent: '#17696a', danger: '#a82a25', success: '#4f6d0c', warning: '#7f5a08', pro: '#5c3f99' },
    gray: {
      anchors: {
        'surface-0': '#f4ecd8',
        'surface-1': '#f8f2e2',
        'surface-2': '#fcf8ec',
        'text-primary': '#15120d',
        'text-secondary': '#3d3628',
        'text-muted': '#5e5442',
      },
    },
    git: { added: '#3f6812', removed: '#962420', modified: '#7f5a04', merged: '#52368f', closed: '#962420', conflicting: '#a0430c', draft: '#5a5140' },
  },
  dark: {
    roles: { accent: '#4fc1bd', danger: '#f0716a', success: '#b0d65a', warning: '#e6b43c', pro: '#b79af0' },
    gray: {
      anchors: {
        'surface-0': '#0d0c0b',
        'surface-1': '#161514',
        'surface-2': '#1e1d1b',
        'surface-3': '#252422',
        'text-primary': '#f7f4ec',
        'text-secondary': '#d3cec0',
        'text-muted': '#a8a294',
      },
    },
    git: { added: '#abd152', removed: '#f78a84', modified: '#eebd48', merged: '#c4acf5', closed: '#f78a84', conflicting: '#f59b62', draft: '#a09a8c' },
  },
})

const LOOK: ThemeSetArgs = { colors: theme }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })
}

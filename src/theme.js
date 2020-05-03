import React from 'react'
import { theme } from '@chakra-ui/core'

const customIcons = {
  'feather-home': {
    path: (
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2.5'
      >
        <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
        <path d='M9 22V12h6v10' />
      </g>
    ),
  },
  'feather-warning': {
    path: (
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2.5'
      >
        <path d='M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2zM12 8v4M12 16h.01' />
      </g>
    ),
  },
  'feather-comment': {
    path: (
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2.5'
      >
        <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
      </g>
    ),
  },
  'feather-chevron-down': {
    path: (
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2.5'
      >
        <path d='M6 9l6 6 6-6' />
      </g>
    ),
  },
  'feather-chevron-right': {
    path: (
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2.5'
      >
        <path d='M9 18l6-6-6-6' />
      </g>
    ),
  },
}

const customTheme = {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons,
  },
}

export default customTheme

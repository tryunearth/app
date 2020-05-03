import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import customTheme from '../theme'
import { AuthProvider } from './AuthContext'
import { ThingsProvider } from './ThingsContext'

const AppProviders = ({ children }) => (
  <AuthProvider>
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ThingsProvider>{children}</ThingsProvider>
    </ThemeProvider>
  </AuthProvider>
)

export default AppProviders

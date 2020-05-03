import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import { AuthProvider } from './AuthContext'
import { ThingsProvider } from './ThingsContext'

const AppProviders = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <CSSReset />
      <ThingsProvider>{children}</ThingsProvider>
    </ThemeProvider>
  </AuthProvider>
)

export default AppProviders

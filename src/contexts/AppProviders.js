import React from 'react'
import { LocationProvider } from '@reach/router'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import customTheme from '../theme'
import { AuthProvider } from './AuthContext'
import { ThingsProvider } from './ThingsContext'

const AppProviders = ({ children }) => (
  <LocationProvider>
    <AuthProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <ThingsProvider>{children}</ThingsProvider>
      </ThemeProvider>
    </AuthProvider>
  </LocationProvider>
)

export default AppProviders

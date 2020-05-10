import React from 'react'
import { LocationProvider } from '@reach/router'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import customTheme from '../theme'
import { AuthProvider } from './AuthContext'

const AppProviders = ({ children }) => (
  <LocationProvider>
    <AuthProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        {children}
      </ThemeProvider>
    </AuthProvider>
  </LocationProvider>
)

export default AppProviders

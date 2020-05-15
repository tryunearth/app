import React from 'react'
import { LocationProvider, Location } from '@reach/router'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import customTheme from '../theme'
import { AuthProvider } from './AuthContext'
import { ThingsProvider } from './ThingsContext'
import { TagModalProvider } from './TagModalContext'

const AppProviders = ({ children }) => (
  <LocationProvider>
    <AuthProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Location>
          {({ location }) => (
            <ThingsProvider location={location}>
              <TagModalProvider>{children}</TagModalProvider>
            </ThingsProvider>
          )}
        </Location>
      </ThemeProvider>
    </AuthProvider>
  </LocationProvider>
)

export default AppProviders

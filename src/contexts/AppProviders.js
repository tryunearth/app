import React from 'react'
import { LocationProvider } from '@reach/router'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import customTheme from '../theme'
import { AuthProvider } from './AuthContext'
import { ThingsProvider } from './ThingsContext'
import { TagModalProvider } from './TagModalContext'
import { FiltersProvider } from './FiltersContext'

const AppProviders = ({ children }) => (
  <LocationProvider>
    <AuthProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <FiltersProvider>
          <ThingsProvider>
            <TagModalProvider>{children}</TagModalProvider>
          </ThingsProvider>
        </FiltersProvider>
      </ThemeProvider>
    </AuthProvider>
  </LocationProvider>
)

export default AppProviders

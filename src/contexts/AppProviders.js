import React from 'react'

import { AuthProvider } from './AuthContext'
import { ThingsProvider } from './ThingsContext'

const AppProviders = ({ children }) => (
  <AuthProvider>
    <ThingsProvider>{children}</ThingsProvider>
  </AuthProvider>
)

export default AppProviders

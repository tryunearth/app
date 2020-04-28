import React from 'react'

import { useAuth } from './contexts/AuthContext'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'

/**
 * Modified take on Kent C. Dodds "separate apps based on authentication".
 * References: https://kentcdodds.com/blog/authentication-in-react-applications
 */
function App() {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App

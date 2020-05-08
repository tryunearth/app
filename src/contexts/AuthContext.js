import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [token, setToken] = useState(localStorage.getItem('token'))

  const updateUser = (newUser) => setUser(newUser)
  const updateToken = (jwt) => setToken(jwt)

  const login = (authenticatedUser, jwt) => {
    localStorage.setItem('user', JSON.stringify(authenticatedUser))
    localStorage.setItem('token', jwt)
    updateUser(authenticatedUser)
    updateToken(jwt)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
    setToken(null)
  }

  const isLoggedIn = user && token ? true : false

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoggedIn, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }

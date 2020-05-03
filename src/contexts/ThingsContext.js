import React, { createContext, useContext, useState } from 'react'

const ThingsContext = createContext([])

const ThingsProvider = ({ children }) => {
  const [things, setThings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const updateThings = (newThings) => setThings(newThings)
  const updateIsLoading = (value) => setIsLoading(value)

  return (
    <ThingsContext.Provider
      value={{ things, updateThings, isLoading, updateIsLoading }}
    >
      {children}
    </ThingsContext.Provider>
  )
}

const useThings = () => useContext(ThingsContext)

export { ThingsProvider, useThings }

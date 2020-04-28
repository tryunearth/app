import React, { createContext, useContext, useState } from 'react'

const ThingsContext = createContext([])

const ThingsProvider = ({ children }) => {
  const [things, setThings] = useState([])
  const updateThings = (newThings) => setThings(newThings)

  return (
    <ThingsContext.Provider value={{ things, updateThings }}>
      {children}
    </ThingsContext.Provider>
  )
}

const useThings = () => useContext(ThingsContext)

export { ThingsProvider, useThings }

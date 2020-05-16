import React, { createContext, useState, useEffect, useContext } from 'react'

import config from '../config'
import { useAuth } from './AuthContext'

const FiltersContext = createContext({
  subreddits: [],
  tags: [],
})

const FiltersProvider = ({ children }) => {
  const { token, user } = useAuth()
  const [filters, setFilters] = useState({})

  const fetchFilters = React.useCallback(async () => {
    if (!token || !user) return
    const response = await fetch(`${config.backend.BASE_URL}/filters`, {
      headers: { Authorization: `bearer ${token}` },
    })
    const data = await response.json()
    setFilters(data.payload.filters)
  }, [token, user])

  useEffect(() => {
    fetchFilters()
  }, [fetchFilters])

  const updateFilters = async () => await fetchFilters()

  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}

const useFilters = () => useContext(FiltersContext)

export { FiltersProvider, useFilters }

import React, { createContext, useContext, useState, useEffect } from 'react'

import config from '../config'
import { useAuth } from './AuthContext'

const ThingsContext = createContext([])

/**
 * Transforms a JavaScript Object into a query string.
 * @param {Object} object JavaScript Object containing a single key-value pair.
 * @see https://gist.github.com/tjmehta/9204891#gistcomment-2971625
 */
const toQueryString = (object) =>
  '?' +
  Object.keys(object)
    .map((key) => `${key}=${object[key].toString()}`)
    .join('&')

const ThingsProvider = ({ children }) => {
  const [things, setThings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentFilter, setCurrentFilter] = useState({})

  const { token, user } = useAuth()

  const updateThings = (newThings) => setThings(newThings)
  const updateIsLoading = (value) => setIsLoading(value)
  const updateCurrentFilter = (filter) => setCurrentFilter(filter)

  useEffect(() => {
    const fetchThings = async () => {
      updateIsLoading(true)
      let queryParam
      if (currentFilter) {
        queryParam = toQueryString(currentFilter)
      }
      const response = await fetch(
        `${config.backend.BASE_URL}/things${queryParam}`,
        {
          headers: { Authorization: `bearer ${token}` },
        },
      )
      const data = await response.json()
      updateThings(data.payload ? data.payload.things : [])
      updateIsLoading(false)
    }
    fetchThings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, currentFilter])

  return (
    <ThingsContext.Provider
      value={{
        things,
        updateThings,
        isLoading,
        updateIsLoading,
        currentFilter,
        updateCurrentFilter,
      }}
    >
      {children}
    </ThingsContext.Provider>
  )
}

const useThings = () => useContext(ThingsContext)

export { ThingsProvider, useThings }

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from '@reach/router'

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
  const location = useLocation()
  const { token, user } = useAuth()

  const sortOrderOptions = [
    { id: 0, value: 'asc', description: 'Oldest to Newest' },
    { id: 1, value: 'desc', description: 'Newest to Oldest' },
  ]
  // TODO - make default/initial `sortBy` value a user preference
  const [sortBy, setSortBy] = useState(sortOrderOptions[1])
  const updateSortBy = (value) =>
    setSortBy(sortOrderOptions.find((option) => option.value === value))

  const [things, setThings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(() => {
    const { pathname } = location
    if (pathname === '/comments') {
      return { name: 'comment' }
    } else if (pathname === '/nsfw') {
      return { over_18: true }
    } else if (/\/subreddits\/[ru]\/\w+/.test(pathname)) {
      const subredditNamePrefixed = pathname.match(/[ru]\/\w+/)[0]
      const formattedSubredditName = subredditNamePrefixed.startsWith('u/')
        ? subredditNamePrefixed.replace('u/', 'u_')
        : subredditNamePrefixed.replace('r/', '')
      return { subreddit: formattedSubredditName }
    } else if (/\/tags\/[^/]+/.test(pathname)) {
      const tag = decodeURI(pathname.split('/')[2])
      return { tag }
    } else {
      return {}
    }
  })

  const updateThings = (newThings) => setThings(newThings)
  const updateIsLoading = (value) => setIsLoading(value)
  const updateCurrentFilter = (filter) => setCurrentFilter(filter)

  useEffect(() => {
    const fetchThings = async () => {
      if (!token || !user) return
      updateIsLoading(true)
      let queryParam
      if (currentFilter) {
        queryParam = toQueryString({
          sort: sortBy.value,
          include: 'tags',
          ...currentFilter,
        })
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
  }, [token, user, currentFilter, sortBy])

  return (
    <ThingsContext.Provider
      value={{
        things,
        updateThings,
        isLoading,
        updateIsLoading,
        currentFilter,
        updateCurrentFilter,
        sortBy,
        updateSortBy,
        sortOrderOptions,
      }}
    >
      {children}
    </ThingsContext.Provider>
  )
}

const useThings = () => useContext(ThingsContext)

export { ThingsProvider, useThings }

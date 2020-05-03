import React, { useState, useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import { useThings } from './contexts/ThingsContext'
import { useAuth } from './contexts/AuthContext'
import { Home, Subreddit, Tag, Comments, NSFW } from './pages'
import { Layout } from './components'

const NotFound = () => <Redirect from='/login' to='/' noThrow />

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

function AuthenticatedApp() {
  const [filters, setFilters] = useState({})
  const [currentFilter, setCurrentFilter] = useState({})

  const { token } = useAuth()
  const { updateThings, updateIsLoading } = useThings()

  useEffect(() => {
    const fetchFilters = async () => {
      const response = await fetch('http://localhost:5000/v1/filters', {
        headers: { Authorization: `bearer ${token}` },
      })
      const data = await response.json()
      setFilters(data.payload.filters)
    }
    fetchFilters()
  }, [token])

  useEffect(() => {
    const fetchThings = async () => {
      updateIsLoading(true)
      let queryParam
      if (currentFilter) {
        queryParam = toQueryString(currentFilter)
      }
      const response = await fetch(
        `http://localhost:5000/v1/things${queryParam}`,
        {
          headers: { Authorization: `bearer ${token}` },
        },
      )
      const data = await response.json()
      updateThings(data.payload ? data.payload.things : [])
      setTimeout(() => updateIsLoading(false), 750)
    }
    fetchThings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentFilter])

  return (
    <Layout filters={filters}>
      <Router>
        <NotFound default />
        <Home updateCurrentFilter={setCurrentFilter} path='/' />
        {/**
         * TODO - make preference to password-protect this route, similar to
         * Snapchat's "My Eyes Only" (protect_nsfw_content: Boolean)
         */}
        <NSFW updateCurrentFilter={setCurrentFilter} path='/nsfw' />
        <Comments updateCurrentFilter={setCurrentFilter} path='/comments' />
        {/**
         * @reach/router does not support regular expressions matching in path,
         * thus we must declare a route for each handler.
         *
         * References: https://github.com/ReactTraining/react-router/issues/391
         */}
        <Subreddit
          updateCurrentFilter={setCurrentFilter}
          path='/subreddits/r/:sub'
        />
        <Subreddit
          updateCurrentFilter={setCurrentFilter}
          path='/subreddits/u/:sub'
        />
        <Tag updateCurrentFilter={setCurrentFilter} path='/tags/:tag' />
      </Router>
    </Layout>
  )
}

export default AuthenticatedApp

import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'

import { ThingsContext } from './contexts'
import { Home, Subreddit, Tag } from './pages'
import { Layout } from './components'

// const JWT =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InhtZWF4IiwiaWF0IjoxNTg2MzA2NzYwfQ.Rbbty0IpdtoR_grX0szP5Z7r5dq6ZmOm_tdkC5M77uY'
const JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE5Y3F1IiwiaWF0IjoxNTg2MzA2MTE2fQ.q7G4p4vONkFsthbjKCaBu-Ge_kcVMATTB1mbWGWTSIY'

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

function App() {
  const [filters, setFilters] = useState({})
  const [currentFilter, setCurrentFilter] = useState({})
  const [things, setThings] = useState([])

  useEffect(() => {
    fetchFilters()
  }, [])

  useEffect(() => {
    const fetchThings = async () => {
      let queryParam
      if (currentFilter) {
        queryParam = toQueryString(currentFilter)
      }
      const response = await fetch(
        `http://localhost:5000/v1/things${queryParam}`,
        {
          headers: { Authorization: `bearer ${JWT}` },
        },
      )
      const data = await response.json()
      setThings(data.payload ? data.payload.things : [])
    }
    fetchThings()
  }, [currentFilter])

  const fetchFilters = async () => {
    const response = await fetch('http://localhost:5000/v1/filters', {
      headers: { Authorization: `bearer ${JWT}` },
    })
    const data = await response.json()
    setFilters(data.payload.filters)
  }

  return (
    <ThingsContext.Provider value={things}>
      <Layout filters={filters}>
        <Router>
          <Home updateCurrentFilter={setCurrentFilter} path='/' />

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
    </ThingsContext.Provider>
  )
}

export default App

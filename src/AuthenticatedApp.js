import React, { useState, useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import { useAuth } from './contexts/AuthContext'
import { Home, Subreddit, Tag, Comments, NSFW } from './pages'
import { Layout } from './components'

const NotFound = () => <Redirect from='/login' to='/' noThrow />

function AuthenticatedApp() {
  const { token } = useAuth()
  const [filters, setFilters] = useState({})

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

  return (
    <Layout filters={filters}>
      <Router>
        <NotFound default />
        <Home path='/' />
        {/**
         * TODO - make preference to password-protect this route, similar to
         * Snapchat's "My Eyes Only" (protect_nsfw_content: Boolean)
         */}
        <NSFW path='/nsfw' />
        <Comments path='/comments' />
        {/**
         * @reach/router does not support regular expressions matching in path,
         * thus we must declare a route for each handler.
         *
         * References: https://github.com/ReactTraining/react-router/issues/391
         */}
        <Subreddit path='/subreddits/r/:sub' />
        <Subreddit path='/subreddits/u/:sub' />
        <Tag path='/tags/:tag' />
      </Router>
    </Layout>
  )
}

export default AuthenticatedApp

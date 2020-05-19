import React from 'react'
import { Router, Redirect } from '@reach/router'

import { Home, Subreddit, Tag, Comments, NSFW } from './pages'
import { Layout } from './components'

const NotFound = () => <Redirect from='/login' to='/' noThrow />

const AuthenticatedApp = () => (
  <Layout>
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

export default AuthenticatedApp

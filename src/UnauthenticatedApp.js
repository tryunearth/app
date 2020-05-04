import React from 'react'
import { Router, Redirect } from '@reach/router'

import { Login, ReceiveFromReddit } from './pages/Login'

const NotFound = () => <Redirect from='blah' to='/login' noThrow />

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Login path='/login' />
      <ReceiveFromReddit path='/auth/reddit' />
      <NotFound default />
    </Router>
  )
}

export default UnauthenticatedApp

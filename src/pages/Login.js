import React from 'react'
import { Redirect } from '@reach/router'
import { OauthReceiver, OauthSender } from 'react-oauth-flow'
import qs from 'querystring'

import { useAuth } from '../contexts/AuthContext'
import { SEO } from '../components'

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'
const CLIENT_ID = process.env.CLIENT_ID || 'E_kbLYovU7c6TA'

const Login = () => {
  const { user, token } = useAuth()

  if (user && token) return <Redirect from='/login' to='/' noThrow />
  return (
    <>
      <SEO title='Login' />
      <h2>Login</h2>
      <OauthSender
        authorizeUrl={'https://reddit.com/api/v1/authorize'}
        clientId={CLIENT_ID}
        redirectUri={`${CLIENT_URL}/auth/reddit`}
        response_type='token'
        state={{ from: '/' }}
        args={{ scope: 'history identity', duration: 'permanent' }}
        render={({ url }) => <a href={url}>Sign In Using Reddit</a>}
      />
    </>
  )
}

const ReceiveFromReddit = () => {
  const { login } = useAuth()

  const handleSuccess = async (accessToken, { response, state }) => {
    const { user, token } = response.payload.auth
    login(user, token)
  }

  const handleError = (error, state) => {
    console.error('An error occurred')
    console.error(error, state)
  }

  const fetchToken = async (url, tokenFetchArgs) => {
    try {
      const { code } = qs.parse(window.location.search)
      const body = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${CLIENT_URL}/auth/reddit`,
      }

      const redditProxyAccessTokenUrl = 'http://localhost:5000/v1/auth/login'
      const response = await fetch(redditProxyAccessTokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await response.json()

      return data
    } catch (error) {
      throw error
    }
  }

  return (
    <OauthReceiver
      tokenUrl='https://www.reddit.com/api/v1/access_token'
      clientId={CLIENT_ID}
      clientSecret='_'
      redirectUri={`${CLIENT_URL}/auth/reddit`}
      tokenFetchArgs={{}}
      tokenFn={fetchToken}
      onAuthSuccess={handleSuccess}
      onAuthError={handleError}
      render={({ processing, state, error }) => (
        <div>
          <SEO title='Authorizing' />
          {processing && <p>Authorizing now...</p>}
          {error && <p className='error'>An error occurred: {error.message}</p>}
        </div>
      )}
    />
  )
}

export { Login, ReceiveFromReddit }

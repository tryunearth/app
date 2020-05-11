import React from 'react'
import { Redirect } from '@reach/router'
import { OauthReceiver, OauthSender } from 'react-oauth-flow'
import { Flex, Heading, Text, Button, Link } from '@chakra-ui/core'
import qs from 'querystring'

import topography from '../assets/topography.svg'

import config from '../config'
import { useAuth } from '../contexts/AuthContext'
import { SEO } from '../components'

const CLIENT_URL = config.reddit.CLIENT_URL
const CLIENT_ID = config.reddit.CLIENT_ID

const RedditAuthButton = ({ url, ...rest }) => (
  <Button
    as={Link}
    href={url}
    isExternal
    size='lg'
    borderRadius='lg'
    fontWeight='semibold'
    color='white'
    bg='#ff4500'
    _hover={{ bg: '#ff4500', textDecor: 'none' }}
    _active={{ bg: '#ff4500', textDecor: 'none' }}
    leftIcon='reddit-square'
    {...rest}
  >
    Login Using Reddit
  </Button>
)

/**
 * TODO - fill in links to PP & TOS once created
 */
const Disclaimer = () => (
  <Text fontSize='sm' color='gray.500' fontWeight='semibold'>
    By using Unearth, you agree to our{' '}
    <Link href='#' color='#ff4500'>
      Privacy Policy
    </Link>{' '}
    and{' '}
    <Link href='#' color='#ff4500'>
      Terms of Service
    </Link>
    .
  </Text>
)

const Login = () => {
  const { user, token } = useAuth()

  if (user && token) return <Redirect from='/login' to='/' noThrow />
  return (
    <>
      <SEO title='Login' />
      <Flex
        px={4}
        direction='column'
        justify='center'
        align='center'
        height='100%'
        textAlign='center'
        backgroundColor='white'
        backgroundImage={`url("${topography}")`}
      >
        <Flex direction='column' mb={6} maxW='containers.sm'>
          <Heading as='h1' size='2xl' mb={2} fontWeight='black'>
            Get Started
          </Heading>
          <Text fontSize='lg' color='gray.500' fontWeight='semibold'>
            Whether you're an existing user or just signing up, use the button
            below to get started with Unearth.
          </Text>
        </Flex>

        <OauthSender
          authorizeUrl={'https://reddit.com/api/v1/authorize'}
          clientId={CLIENT_ID}
          redirectUri={`${CLIENT_URL}/auth/reddit`}
          response_type='token'
          state={{ from: '/' }}
          args={{ scope: 'history identity', duration: 'permanent' }}
          render={({ url }) => <RedditAuthButton url={url} mb={16} />}
        />

        <Disclaimer />
      </Flex>
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

      const redditProxyAccessTokenUrl = `${config.backend.BASE_URL}/auth/login`
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

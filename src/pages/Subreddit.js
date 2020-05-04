import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Heading } from '@chakra-ui/core'

import { useThings } from '../contexts/ThingsContext'
import { SEO } from '../components'

const Subreddit = ({ sub }) => {
  const { updateCurrentFilter } = useThings()
  const { pathname } = useLocation()
  const subredditNamePrefixed = pathname.match(/[ru]\/\w+/)[0]
  const formattedSubredditName = subredditNamePrefixed.startsWith('u/')
    ? subredditNamePrefixed.replace('u/', 'u_')
    : sub

  useEffect(() => {
    updateCurrentFilter({
      subreddit: formattedSubredditName,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub, formattedSubredditName])

  return (
    <>
      <SEO title={`Subreddit: ${subredditNamePrefixed}`} />
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        {subredditNamePrefixed}
      </Heading>
    </>
  )
}

export default Subreddit

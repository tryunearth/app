import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Heading } from '@chakra-ui/core'

const Subreddit = ({ updateCurrentFilter, sub }) => {
  const { pathname } = useLocation()
  const subredditNamePrefixed = pathname.match(/[ru]\/\w+/)[0]
  const formattedSubredditName = subredditNamePrefixed.startsWith('u/')
    ? subredditNamePrefixed.replace('u/', 'u_')
    : sub

  useEffect(() => {
    updateCurrentFilter({
      subreddit: formattedSubredditName,
    })
  }, [sub, formattedSubredditName, updateCurrentFilter])

  return (
    <>
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        {subredditNamePrefixed}
      </Heading>
    </>
  )
}

export default Subreddit

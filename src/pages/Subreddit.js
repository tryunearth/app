import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'

import { ThingsList } from '../components'

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
      <h2>{subredditNamePrefixed}</h2>
      <ThingsList />
    </>
  )
}

export default Subreddit

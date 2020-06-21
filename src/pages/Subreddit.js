import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'

import { useThings } from '../contexts/ThingsContext'
import { PageHeader } from '../components'

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
    <PageHeader
      seoTitle={`Subreddit: ${subredditNamePrefixed}`}
      pageHeading={subredditNamePrefixed}
    />
  )
}

export default Subreddit

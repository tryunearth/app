import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'

import { ThingsList } from '../components'

const Subreddit = ({ updateCurrentFilter, sub }) => {
  const { pathname } = useLocation()
  const subredditNamePrefixed = pathname.match(/[ru]\/\w+/)[0]

  useEffect(() => {
    updateCurrentFilter({ subreddit: sub })
  }, [sub, updateCurrentFilter])

  return (
    <>
      <h2>{subredditNamePrefixed}</h2>
      <ThingsList />
    </>
  )
}

export default Subreddit

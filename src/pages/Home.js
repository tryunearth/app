import React, { useEffect } from 'react'

import { ThingsList } from '../components'

const Home = ({ updateCurrentFilter }) => {
  useEffect(() => {
    updateCurrentFilter({})
  }, [updateCurrentFilter])

  return (
    <>
      <h2>My Feed</h2>
      <ThingsList />
    </>
  )
}

export default Home

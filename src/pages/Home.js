import React, { useEffect } from 'react'

import { useThings } from '../contexts/ThingsContext'
import { PageHeader } from '../components'

const Home = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PageHeader seoTitle='My Feed' pageHeading='My Feed' />
}

export default Home

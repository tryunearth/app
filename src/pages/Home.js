import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

import { useThings } from '../contexts/ThingsContext'
import { SEO } from '../components'

const Home = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SEO title='My Feed' />
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        My Feed
      </Heading>
    </>
  )
}

export default Home

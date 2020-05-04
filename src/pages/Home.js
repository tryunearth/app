import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

import { useThings } from '../contexts/ThingsContext'

const Home = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        My Feed
      </Heading>
    </>
  )
}

export default Home

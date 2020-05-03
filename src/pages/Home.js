import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

const Home = ({ updateCurrentFilter }) => {
  useEffect(() => {
    updateCurrentFilter({})
  }, [updateCurrentFilter])

  return (
    <>
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        My Feed
      </Heading>
    </>
  )
}

export default Home

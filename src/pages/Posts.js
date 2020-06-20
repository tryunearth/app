import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

import { useThings } from '../contexts/ThingsContext'
import { SEO } from '../components'

const Posts = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ name: 'post' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SEO title='Posts' />
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        Posts
      </Heading>
    </>
  )
}

export default Posts

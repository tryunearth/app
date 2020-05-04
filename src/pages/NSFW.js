import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

import { useThings } from '../contexts/ThingsContext'
import { SEO } from '../components'

const NSFW = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ over_18: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SEO title='NSFW' />
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        NSFW
      </Heading>
    </>
  )
}

export default NSFW

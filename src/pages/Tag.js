import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

import { useThings } from '../contexts/ThingsContext'
import { SEO } from '../components'

const Tag = ({ tag }) => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ tag })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag])

  return (
    <>
      <SEO title={`Tag: ${tag}`} />
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        {tag}
      </Heading>
    </>
  )
}

export default Tag

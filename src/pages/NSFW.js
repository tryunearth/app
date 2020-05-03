import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

const NSFW = ({ updateCurrentFilter }) => {
  useEffect(() => {
    updateCurrentFilter({ over_18: true })
  }, [updateCurrentFilter])

  return (
    <>
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        NSFW
      </Heading>
    </>
  )
}

export default NSFW

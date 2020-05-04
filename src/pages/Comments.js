import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

import { useThings } from '../contexts/ThingsContext'

const Comments = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ name: 'comment' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        Comments
      </Heading>
    </>
  )
}

export default Comments

import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

const Comments = ({ updateCurrentFilter }) => {
  useEffect(() => {
    updateCurrentFilter({ name: 'comment' })
  }, [updateCurrentFilter])

  return (
    <>
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        Comments
      </Heading>
    </>
  )
}

export default Comments

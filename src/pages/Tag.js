import React, { useEffect } from 'react'
import { Heading } from '@chakra-ui/core'

const Tag = ({ updateCurrentFilter, tag }) => {
  useEffect(() => {
    updateCurrentFilter({ tag })
  }, [tag, updateCurrentFilter])

  return (
    <>
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        {tag}
      </Heading>
    </>
  )
}

export default Tag

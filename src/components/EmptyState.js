import React from 'react'
import { Box, Text } from '@chakra-ui/core'

const EmptyState = () => (
  <Box
    d='flex'
    flexDir='column'
    justifyContent='center'
    alignItems='center'
    h='75%'
  >
    <Text textAlign='center'>
      Oh how sad{' '}
      <span role='img' aria-label='frowning face'>
        😔
      </span>
    </Text>
    <Text>It appears there are no things in this category</Text>
  </Box>
)

export default EmptyState

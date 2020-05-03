import React from 'react'
import { Box, Flex, Skeleton } from '@chakra-ui/core'

const LoadingState = () => {
  const emptyStateIds = [0, 1, 2]
  return emptyStateIds.map((id) => (
    <Flex key={id} w='100%' maxW='full' mb={8}>
      <Box flex={1}>
        <Skeleton h='20px' my='10px' />
        <Skeleton h='20px' w='lg' my='10px' />
        <Skeleton h='20px' w='md' my='10px' />
      </Box>
      <Skeleton minW='125px' h='84px' ml={8} />
    </Flex>
  ))
}

export default LoadingState

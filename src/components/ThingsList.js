import React from 'react'
import { Box, Flex, Image, Text, Link, Badge } from '@chakra-ui/core'

import { useThings } from '../contexts/ThingsContext'
import { EmptyState, LoadingState } from '../components'

const Thing = React.memo(({ thing }) => (
  <Flex
    justifyContent='space-between'
    w='100%'
    maxW='full'
    p={4}
    pl={0}
    as='article'
    borderBottomWidth='1px'
  >
    <Box>
      {thing.name === 'comment' && (
        <Box
          color='#ff4500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
        >
          in response to
        </Box>
      )}
      <Text fontSize='lg' fontWeight='bold'>
        <Link
          href={`https://reddit.com${thing.permalink}`}
          isExternal
          _hover={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
        >
          {thing.title}
        </Link>
      </Text>
      <Box mt={2} color='gray.600'>
        <Text d='inline-block' fontWeight='semibold'>
          {thing.subreddit_name_prefixed}
        </Text>
        {` `}&bull;{` `}
        <Text d='inline-block'>
          {thing.name === 'comment' ? 'Comment from' : 'Posted by'}{' '}
          {thing.author}
        </Text>
        {thing.over_18 && (
          <>
            {` `}&bull;{` `}
            <Badge variantColor='red'>nsfw</Badge>
          </>
        )}
      </Box>
    </Box>
    <Image
      ml={8}
      minW='125px'
      maxW='125px'
      h='84px'
      objectFit='cover'
      src={thing.thumbnail}
      fallbackSrc={`https://dummyimage.com/600x400/4A5568/fff&text=${thing.title[0].toUpperCase()}`}
      alt={thing.title}
      borderRadius='md'
      // TODO - make this a preference (blur_nsfw_pics: Boolean)
      // style={thing.over_18 ? { filter: 'blur(4px)' } : null}
    />
  </Flex>
))

const ThingsList = () => {
  const { things, isLoading } = useThings()
  if (isLoading) return <LoadingState />
  if (things.length === 0) return <EmptyState />
  // TODO - use show/hide NSFW preference to filter nsfw content (show_nsfw_content: Boolean)
  return things.map((thing) => <Thing key={thing.id} thing={thing} />)
}

export default ThingsList

import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  Badge,
  ButtonGroup,
  IconButton,
  Stack,
  Tag,
  Tooltip,
} from '@chakra-ui/core'
import { Link as RouterLink } from '@reach/router'
import { FiLink, FiTag, FiTrash } from 'react-icons/fi'

import { useTagModal } from '../contexts/TagModalContext'
import { useThingDeletionAlert } from '../contexts/ThingDeletionAlertContext'

const BACKGROUND_COLORS = [
  'A0AEC0',
  '718096',
  '4A5568',
  '2D3748',
  '1A202C',
  '171923',
  '90cdf4',
]

const Thing = React.memo(({ thing }) => {
  const { handleOpen } = useTagModal()
  const { handleThingDeletionOpen } = useThingDeletionAlert()

  const computeBgColor = () => {
    const charCode = thing.author[0].toUpperCase().charCodeAt(0)
    let index

    if (charCode === 45) {
      index = 0
    } else if (charCode === 95) {
      index = 6
    } else {
      index = Math.floor(((charCode - 65) / 28) * 7)
    }
    return BACKGROUND_COLORS[index]
  }

  return (
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
              <RouterLink to='/nsfw'>
                <Badge variantColor='red'>nsfw</Badge>
              </RouterLink>
            </>
          )}
        </Box>
        <Stack mt={2} spacing={2} alignItems='center' isInline>
          <ButtonGroup spacing={0}>
            <Tooltip
              label='Open External Link'
              aria-label='Open External Link'
              hasArrow
              closeOnClick
              placement='bottom'
              showDelay={600}
            >
              <Link
                ml={1}
                href={thing.url}
                isExternal
                w={8}
                h={8}
                display='inline-block'
              >
                <IconButton icon={FiLink} size='sm' variant='ghost' />
              </Link>
            </Tooltip>
            <Tooltip
              label='Delete Thing'
              aria-label='Delete Thing'
              hasArrow
              closeOnClick
              placement='bottom'
              showDelay={600}
            >
              <IconButton
                icon={FiTrash}
                size='sm'
                variant='ghost'
                onClick={() => handleThingDeletionOpen(thing)}
              />
            </Tooltip>
            <Tooltip
              label='Edit Tags'
              aria-label='Edit Tags'
              hasArrow
              closeOnClick
              placement='bottom'
              showDelay={600}
            >
              <IconButton
                icon={FiTag}
                size='sm'
                variant='ghost'
                onClick={() => handleOpen(thing)}
              />
            </Tooltip>
          </ButtonGroup>
          <Stack spacing={2} flexWrap='wrap' isInline>
            {thing.tags.map((tag) => (
              <Tag size='sm' key={tag} variantColor='gray'>
                <RouterLink to={`/tags/${tag}`}>{tag}</RouterLink>
              </Tag>
            ))}
          </Stack>
        </Stack>
      </Box>
      <Image
        ml={8}
        minW='125px'
        maxW='125px'
        h='84px'
        objectFit='cover'
        src={thing.thumbnail}
        fallbackSrc={`https://placehold.jp/${computeBgColor()}/f2f9ff/400x200.png?text=${thing.title[0].toUpperCase()}&css={"font-weight"%3A"bold"}`}
        alt={thing.title}
        borderRadius='md'
        // TODO - make this a preference (blur_nsfw_pics: Boolean)
        // style={thing.over_18 ? { filter: 'blur(4px)' } : null}
      />
    </Flex>
  )
})

Thing.propTypes = {
  /** Object representing a saved Reddit post or comment. */
  thing: PropTypes.object.isRequired,
}

export default Thing

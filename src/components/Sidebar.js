import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/core'

import { NavLink, FilterCollapse } from '../components'

const Sidebar = ({ filters }) => (
  <Box as='aside' mr={8} w='250px' overflowY='scroll'>
    <Stack isInline justify='flex-start' align='center' cursor='pointer' mb={4}>
      <NavLink to='/' icon='feather-home'>
        Home
      </NavLink>
    </Stack>
    <Text mb={3} pl={2} color='gray.400' fontWeight='semibold'>
      Filters
    </Text>
    <Stack isInline justify='flex-start' align='center' cursor='pointer'>
      <NavLink to='/comments' icon='feather-comment'>
        Comments
      </NavLink>
    </Stack>
    <Stack isInline justify='flex-start' align='center' cursor='pointer'>
      <NavLink to='/nsfw' icon='feather-warning'>
        NSFW
      </NavLink>
    </Stack>
    <Stack isInline justify='flex-start' align='center' cursor='pointer'>
      <FilterCollapse
        label='Subreddits'
        prefix='subreddits'
        list={filters['subreddits']}
      />
    </Stack>
    <Stack isInline justify='flex-start' align='center' cursor='pointer'>
      <FilterCollapse label='Tags' prefix='tags' list={filters['tags']} />
    </Stack>
  </Box>
)

export default Sidebar

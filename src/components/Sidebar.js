import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/core'

import { useFilters } from '../contexts/FiltersContext'
import { NavLink, FilterCollapse } from '../components'

const Sidebar = () => {
  const { filters } = useFilters()

  return (
    <Box as='aside' mr={8} w='250px' overflowY='scroll'>
      <Stack
        isInline
        justify='flex-start'
        align='center'
        cursor='pointer'
        mb={4}
      >
        <NavLink to='/' icon='bs-home'>
          Home
        </NavLink>
      </Stack>
      <Text mb={3} pl={5} color='gray.400' fontWeight='semibold'>
        Filters
      </Text>
      <Stack isInline justify='flex-start' align='center' cursor='pointer'>
        <NavLink to='/comments' icon='bs-chat'>
          Comments
        </NavLink>
      </Stack>
      <Stack isInline justify='flex-start' align='center' cursor='pointer'>
        <NavLink to='/nsfw' icon='bs-warning'>
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
}

export default Sidebar

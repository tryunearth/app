import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/core'

import { NavLink, FilterCollapse } from '../components'

const Sidebar = ({ filters }) => (
  <Box as='aside' mr={8} w='250px' overflowY='scroll'>
    <Stack isInline justify='flex-start' align='center' cursor='pointer' mb={4}>
      <NavLink to='/' icon='info'>
        Home
      </NavLink>
    </Stack>
    <Text mb={3} pl={2} color='gray.400' fontWeight='semibold'>
      Filters
    </Text>
    <Stack isInline justify='flex-start' align='center' cursor='pointer'>
      <NavLink to='/comments' icon='chat'>
        Comments
      </NavLink>
    </Stack>
    <Stack isInline justify='flex-start' align='center' cursor='pointer'>
      <NavLink to='/nsfw' icon='not-allowed'>
        NSFW
      </NavLink>
    </Stack>
    {Object.keys(filters).map((filter, index, arr) => (
      <Box key={filter} pb={index === arr.length - 1 ? 6 : 0}>
        <FilterCollapse title={filter} list={filters[filter]} />
      </Box>
    ))}
  </Box>
)

export default Sidebar

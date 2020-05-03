import React from 'react'
import { Box, Stack, List } from '@chakra-ui/core'

import { NavLink, FilterCollapse } from '../components'

const Sidebar = ({ filters }) => (
  <Box as='aside' mr={8} w='250px' overflowY='scroll'>
    <Stack isInline justify='flex-start' align='center' cursor='pointer'>
      <NavLink to='/' icon='info'>
        Home
      </NavLink>
    </Stack>
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
      <List key={filter} pb={index === arr.length - 1 ? 8 : 0}>
        <FilterCollapse title={filter} list={filters[filter]} />
      </List>
    ))}
  </Box>
)

export default Sidebar

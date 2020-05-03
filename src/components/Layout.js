import React from 'react'
import { Box } from '@chakra-ui/core'

import { ThingsList, Header, Sidebar } from '../components'

const Layout = React.memo(({ filters, children }) => (
  <Box h='100%'>
    <Header />
    <Box
      as='main'
      px={24}
      mt={8}
      d='flex'
      justifyContent='flex-start'
      h='calc(100% - 97px)'
      overflow='auto'
    >
      <Sidebar filters={filters} />
      <Box as='section' flex='4 1 0' overflowY='scroll'>
        {children}
        <ThingsList />
      </Box>
    </Box>
  </Box>
))

export default Layout

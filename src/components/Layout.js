import React from 'react'
import { Box } from '@chakra-ui/core'

import { ThingsProvider } from '../contexts/ThingsContext'
import { ThingsList, Header, Sidebar, OnboardingModal } from '../components'

const Layout = React.memo(({ filters, children }) => (
  <Box h='100%'>
    <OnboardingModal />
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
        <ThingsProvider>
          {children}
          <ThingsList />
        </ThingsProvider>
      </Box>
    </Box>
  </Box>
))

export default Layout

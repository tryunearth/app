import React from 'react'
import { Box } from '@chakra-ui/core'

import { ThingsList, Header, Sidebar, OnboardingModal } from '../components'
import { TagDeletionAlertProvider } from '../contexts/TagDeletionAlertContext'
import { ThingDeletionAlertProvider } from '../contexts/ThingDeletionAlertContext'

const Layout = React.memo(({ children }) => (
  <Box h='100%' maxW={1440} mx='auto'>
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
      <TagDeletionAlertProvider>
        <Sidebar />
      </TagDeletionAlertProvider>
      <Box as='section' flex='4 1 0' overflowY='scroll'>
        <ThingDeletionAlertProvider>
          {children}
          <ThingsList />
        </ThingDeletionAlertProvider>
      </Box>
    </Box>
  </Box>
))

export default Layout

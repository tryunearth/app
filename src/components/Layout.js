import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/core'

import { ThingsList, Header, Sidebar, OnboardingModal } from '../components'
import { TagDeletionAlertProvider } from '../contexts/TagDeletionAlertContext'
import { ThingDeletionAlertProvider } from '../contexts/ThingDeletionAlertContext'

const Layout = React.memo(({ hideThingsList, children }) => (
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
          {!hideThingsList && <ThingsList />}
        </ThingDeletionAlertProvider>
      </Box>
    </Box>
  </Box>
))

Layout.defaultProps = { hideThingsList: false }

Layout.propTypes = {
  /**
   * If `true`, the <ThingsList /> component will be hidden from the view.
   * Useful for showing admin-type pages. Defaults to `false`.
   */
  hideThingsList: PropTypes.bool,
  /** The content of the current page. */
  children: PropTypes.node.isRequired,
}

export default Layout

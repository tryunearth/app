import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Box } from '@chakra-ui/core'

import { SEO, ThingsListSortDropdown } from '../../components'

const PageHeader = ({ seoTitle, pageHeading }) => (
  <>
    <SEO title={seoTitle} />
    <Box
      mb={4}
      display='flex'
      justifyContent='space-between'
      alignItems='flex-end'
    >
      <Heading as='h3' size='xl' fontWeight='bold'>
        {pageHeading}
      </Heading>
      <ThingsListSortDropdown />
    </Box>
  </>
)

PageHeader.propTypes = {
  seoTitle: PropTypes.string.isRequired,
  pageHeading: PropTypes.string.isRequired,
}

export default PageHeader

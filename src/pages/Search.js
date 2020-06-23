import React, { useEffect } from 'react'

import { useThings } from '../contexts/ThingsContext'
import { PageHeader } from '../components'

const Search = ({ query }) => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ q: query })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <PageHeader
      seoTitle={`Search: ${query}`}
      pageHeading={`Search: ${query}`}
    />
  )
}

export default Search

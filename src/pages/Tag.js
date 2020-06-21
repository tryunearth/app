import React, { useEffect } from 'react'

import { useThings } from '../contexts/ThingsContext'
import { PageHeader } from '../components'

const Tag = ({ tag }) => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ tag })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag])

  return <PageHeader seoTitle={`Tag: ${tag}`} pageHeading={tag} />
}

export default Tag

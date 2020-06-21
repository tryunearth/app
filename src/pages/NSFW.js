import React, { useEffect } from 'react'

import { useThings } from '../contexts/ThingsContext'
import { PageHeader } from '../components'

const NSFW = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ over_18: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PageHeader seoTitle='NSFW' pageHeading='NSFW' />
}

export default NSFW

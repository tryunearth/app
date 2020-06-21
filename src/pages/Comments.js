import React, { useEffect } from 'react'

import { useThings } from '../contexts/ThingsContext'
import { PageHeader } from '../components'

const Comments = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ name: 'comment' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PageHeader seoTitle='Comments' pageHeading='Comments' />
}

export default Comments

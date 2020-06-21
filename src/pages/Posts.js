import React, { useEffect } from 'react'

import { useThings } from '../contexts/ThingsContext'
import { PageHeader } from '../components'

const Posts = () => {
  const { updateCurrentFilter } = useThings()

  useEffect(() => {
    updateCurrentFilter({ name: 'post' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PageHeader seoTitle='Posts' pageHeading='Posts' />
}

export default Posts

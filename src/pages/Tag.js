import React, { useEffect } from 'react'

import { ThingsList } from '../components'

const Tag = ({ updateCurrentFilter, tag }) => {
  useEffect(() => {
    updateCurrentFilter({ tag })
  }, [tag, updateCurrentFilter])

  return (
    <>
      <h2>{tag}</h2>
      <ThingsList />
    </>
  )
}

export default Tag

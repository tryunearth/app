import React from 'react'

import { useThings } from '../contexts/ThingsContext'

const ThingsList = () => {
  const { things } = useThings()
  return (
    <div>
      {things.length > 0 && (
        <ul>
          {things.map((thing) => (
            <li key={thing.id}>{thing.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ThingsList

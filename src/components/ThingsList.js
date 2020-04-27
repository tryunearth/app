import React, { useContext } from 'react'

import { ThingsContext } from '../contexts'

const ThingsList = () => {
  const things = useContext(ThingsContext)
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

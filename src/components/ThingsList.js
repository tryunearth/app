import React from 'react'
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized'

import { Thing } from '../components'
import { useThings } from '../contexts/ThingsContext'
import { EmptyState, LoadingState } from '../components'

const ThingsList = () => {
  const { things, isLoading } = useThings()
  const PAGE_HEADING_HEIGHT = 45 + 16
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minWidth: 400,
    defaultHeight: 200,
  })

  const rowRenderer = ({ index, key, parent, style }) => {
    const thing = things[index]
    const content = <Thing thing={thing} />

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <div ref={registerChild} style={style}>
            {content}
          </div>
        )}
      </CellMeasurer>
    )
  }

  if (isLoading) return <LoadingState />
  if (things.length === 0) return <EmptyState />
  // TODO - use show/hide NSFW preference to filter nsfw content (show_nsfw_content: Boolean)
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          style={{ outline: 'none' }}
          width={width}
          height={height - PAGE_HEADING_HEIGHT}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          rowCount={things.length}
          overscanRowCount={10}
        />
      )}
    </AutoSizer>
  )
}

export default ThingsList

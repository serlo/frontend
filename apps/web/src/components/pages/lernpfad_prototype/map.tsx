import { useEffect, useState } from 'react'
import { TransformComponent, useControls } from 'react-zoom-pan-pinch'

import { MapItem } from './map-item'
import type { MapItemId, MapItemsRecord } from './types'
import { cn } from '@/helper/cn'

export function Map({
  mapItems,
  onMapItemClick,
}: {
  mapItems: MapItemsRecord
  onMapItemClick: (id: MapItemId) => void
}) {
  const [initialZoomDone, setInitialZoomDone] = useState(false)
  const { zoomToElement } = useControls()

  // Zoom to next incomplete map item animation
  useEffect(() => {
    if (initialZoomDone) return

    const idToZoomTo = Object.keys(mapItems).find(
      (key) => mapItems[key].done === false
    )
    if (!idToZoomTo) return

    const timer = setTimeout(() => {
      zoomToElement(idToZoomTo, 2)
      setInitialZoomDone(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [mapItems, initialZoomDone, zoomToElement])

  return (
    <TransformComponent>
      <div
        className={cn(
          'relative h-[calc(100vh_-_100px)] w-screen',
          'bg-[url(/_assets/img/prototype/map_full.svg)]',
          'bg-[length:auto_100%] bg-top bg-no-repeat'
        )}
      >
        <div className="relative left-1/2  h-[calc(100vh_-_100px)] w-[1194px] max-w-[153vh] -translate-x-1/2">
          {Object.keys(mapItems).map((id) => (
            <MapItem
              key={id}
              id={id}
              mapItems={mapItems}
              onClick={onMapItemClick}
            />
          ))}
        </div>
      </div>
    </TransformComponent>
  )
}

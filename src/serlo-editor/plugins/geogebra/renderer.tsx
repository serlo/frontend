import { useEffect, useState } from 'react'

import { tw } from '@/helper/tw'

export interface GeogebraRendererProps {
  id: string
  url: string
}

export function GeogebraRenderer({ id, url }: GeogebraRendererProps) {
  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    // hack to size iframe according to geogebra thumnails aspect ratio
    const placeholder = document.querySelector(
      `main img[src$='${id}']`
    ) as HTMLImageElement
    if (!placeholder || !placeholder.offsetParent) return
    const { naturalWidth, naturalHeight, offsetParent } = placeholder
    const maxSize = (offsetParent as HTMLDivElement).offsetWidth
    const aspect = naturalWidth / naturalHeight
    const portraitMode = aspect < 1

    const width = Math.round(portraitMode ? maxSize * aspect : maxSize)
    const height = Math.round(portraitMode ? maxSize : maxSize / aspect)
    setDimensions({ width, height })

    // hack to hide overlay on some portrait mode applets
    const wrapper =
      offsetParent.parentElement?.querySelector('.wrapping-overlay')
    if (wrapper) (wrapper as HTMLDivElement).style.display = 'none'
  }, [id])

  if (!dimensions) return null
  const { width, height } = dimensions

  // from https://wiki.geogebra.org/en/Reference:Material_Embedding_(Iframe)
  const urlWithParams = `${url}/width/${width}/height/${height}/border/transparent/`

  return (
    <div className="block h-full w-full overflow-hidden bg-brand-50 p-0">
      {urlWithParams ? (
        <iframe
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={tw`
            absolute top-0 left-0 z-10 h-auto border-none bg-black bg-opacity-30
          `}
          title={url}
          scrolling="no"
          src={urlWithParams}
        />
      ) : null}
    </div>
  )
}

export function parseId(idOrUrl: string) {
  const id = idOrUrl.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + id
  return { cleanId: id, url }
}

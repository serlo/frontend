import { tw } from '@/helper/tw'

export function parseId(idOrUrl: string) {
  const id = idOrUrl.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + id
  return { cleanId: id, url }
}

export interface GeogebraRendererProps {
  url: string
}

export function GeogebraRenderer({ url }: GeogebraRendererProps) {
  return (
    <div className="block h-0 overflow-hidden p-0">
      <iframe
        className={tw`
              absolute top-0 left-0 z-10 h-full
              w-full border-none bg-black bg-opacity-30
            `}
        title={url}
        scrolling="no"
        src={url}
      />
    </div>
  )
}

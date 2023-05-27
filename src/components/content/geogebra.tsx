import clsx from 'clsx'

import { PrivacyWrapper } from './privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'

export interface GeogebraProps {
  id: string
}

export function Geogebra({ id }: GeogebraProps) {
  const appletId = id.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + appletId
  return (
    <>
      <PrivacyWrapper
        type="applet"
        provider={ExternalProvider.GeoGebra}
        embedUrl={url}
        className="print:hidden"
      >
        <div className="block h-0 overflow-hidden p-0">
          <iframe
            className={clsx(
              'absolute top-0 left-0 z-10 w-full',
              'h-full border-none bg-black bg-opacity-30'
            )}
            title={appletId}
            scrolling="no"
            src={url}
          />
        </div>
      </PrivacyWrapper>
      <p className="serlo-p hidden print:block">[{url}]</p>
    </>
  )
}

import clsx from 'clsx'

import { PrivacyWrapper } from './privacy-wrapper'
import { submitEventWithPath } from '@/helper/submit-event'
import { ExternalProvider } from '@/helper/use-consent'
import { NodePath } from '@/schema/article-renderer'

export interface GeogebraProps {
  id: string
  path?: NodePath
}

export function Geogebra({ id, path }: GeogebraProps) {
  const appletId = id.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + appletId
  return (
    <>
      <PrivacyWrapper
        type="applet"
        provider={ExternalProvider.GeoGebra}
        embedUrl={url}
        onLoad={() => {
          submitEventWithPath('loadgeogebra', path)
        }}
        className="print:hidden"
      >
        <div className="p-0 block h-0 overflow-hidden">
          <iframe
            className={clsx(
              'z-10 absolute top-0 left-0 w-full',
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

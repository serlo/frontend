import Script from 'next/script'

import { PrivacyWrapper } from './privacy-wrapper'
import { ExternalProvider } from '@/helper/use-consent'

export interface H5pProps {
  url: string
}

export function H5p({ url }: H5pProps) {
  const id = /https:\/\/app\.lumi\.education\/run\/(.+)/i.exec(url)
  const src = `https://app.Lumi.education/api/v1/run/${id ? id[1] : '_'}/embed`

  return (
    <>
      <PrivacyWrapper
        type="h5p"
        provider={ExternalProvider.H5p}
        embedUrl={url}
        className="print:hidden"
      >
        <div className="mx-side mb-block">
          <iframe
            src={src}
            width="727"
            height="500"
            allowFullScreen
            allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
          ></iframe>
          <Script src="/_assets/h5p-resizer.js" />
        </div>
      </PrivacyWrapper>
      <p className="serlo-p hidden print:block">[{url}]</p>
    </>
  )
}

import Script from 'next/script'
import { useState } from 'react'

export interface H5pProps {
  url: string
}

export function H5p({ url }: H5pProps) {
  const [consent, setConsent] = useState(false)
  const id = /https:\/\/app\.lumi\.education\/run\/(.+)/i.exec(url)
  const src = `https://app.Lumi.education/api/v1/run/${id ? id[1] : '_'}/embed`

  if (!consent) {
    return (
      <div className="mx-side mb-block flex justify-center items-center h-[500px] border-4 border-brand rounded">
        <button
          className="serlo-button-blue"
          onClick={() => {
            setConsent(true)
          }}
        >
          Interaktives Element laden
        </button>
      </div>
    )
  }
  return (
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
  )
}

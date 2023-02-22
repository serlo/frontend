import Script from 'next/script'
import { useState } from 'react'

export interface H5pProps {
  url: string
}

export function H5p({ url }: H5pProps) {
  const [consent, setConsent] = useState(false)

  if (!consent) {
    return (
      <div className="mx-side mb-block flex justify-center items-center h-64 border-4 border-brand rounded">
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
        src={url}
        width="1088"
        height="720"
        allowFullScreen
        allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
      ></iframe>
      <Script src="https://app.Lumi.education/api/v1/h5p/core/js/h5p-resizer.js" />
    </div>
  )
}

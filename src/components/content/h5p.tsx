import Script from 'next/script'

import { useInstanceData } from '@/contexts/instance-context'

export interface H5pProps {
  url: string
}

export function H5p({ url }: H5pProps) {
  const id = /https:\/\/app\.lumi\.education\/run\/(.+)/i.exec(url)
  const { strings } = useInstanceData()

  if (!id) {
    return <p className="serlo-p">{strings.errors.defaultMessage}</p>
  }

  const src = `/api/frontend/lumi/embed/${id[1]}`

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

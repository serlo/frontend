import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import Script from 'next/script'

export interface H5pRendererProps {
  url: string
}

export function parseH5pUrl(url: string) {
  const result = /https:\/\/app\.lumi\.education\/run\/([\w-]+)/i.exec(url)
  return result ? result[1] : null
}

export function H5pRenderer({ url }: H5pRendererProps) {
  const id = parseH5pUrl(url)
  const { strings } = useInstanceData()

  if (!id) {
    return <p className="serlo-p">{strings.errors.defaultMessage}</p>
  }

  const src = `/api/frontend/lumi/embed/${id}`

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

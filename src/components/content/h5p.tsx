import Script from 'next/script'

export interface H5pProps {
  url: string
}

export function H5p({ url }: H5pProps) {
  const id = /https:\/\/app\.lumi\.education\/run\/(.+)/i.exec(url)
  const src = `/api/frontend/lumi/embed/${id ? id[1] : '_'}`

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

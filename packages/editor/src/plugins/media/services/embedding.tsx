import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import { GeogebraRenderer } from './geogebra'
import { ImageRenderer } from './html-image'
import { VideoRenderer } from './html-video'
import { resolveEmbedding } from './resolve-embedding'
import { Embed, Resource, EmbeddingProp } from './types'
import { FaIcon } from '@/components/fa-icon'

export function Embedding({ resource }: { resource: Resource }) {
  const embeddingResult = resolveEmbedding(resource)
  const embeddingResultIsPromise = embeddingResult instanceof Promise

  const [embedding, setEmbedding] = useState<EmbeddingProp | null>(
    embeddingResultIsPromise ? null : embeddingResult
  )

  useEffect(() => {
    if (embeddingResultIsPromise) {
      void (async () => setEmbedding(await embeddingResult))()
    }
  }, [embeddingResult, embeddingResultIsPromise, setEmbedding])

  if (embedding === null) {
    // TODO: Design spinner
    return (
      <div className="flex min-h-32 w-full items-center justify-center rounded-b bg-orange-100">
        <FaIcon icon={faSpinner} className="mr-2 animate-spin-slow" />
        Loading...
      </div>
    )
  } else if (embedding.type === Embed.HTMLImage) {
    return <ImageRenderer {...embedding} />
  } else if (embedding.type === Embed.HTMLVideo) {
    return <VideoRenderer {...embedding} />
  } else if (embedding.type === Embed.GeoGebraApplet) {
    return <GeogebraRenderer {...embedding} />
  }
}

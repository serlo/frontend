import { useEffect, useState } from 'react'

import { GeogebraRenderer } from './geogebra'
import { ImageRenderer } from './html-image'
import { VideoRenderer } from './html-video'
import { resolveEmbedding } from './resolve-embedding'
import { Embed, Resource, EmbeddingProp } from './types'

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
    return <div>Load embedding...</div>
  } else if (embedding.type === Embed.HTMLImage) {
    return <ImageRenderer {...embedding} />
  } else if (embedding.type === Embed.HTMLVideo) {
    return <VideoRenderer {...embedding} />
  } else if (embedding.type === Embed.GeoGebraApplet) {
    return <GeogebraRenderer {...embedding} />
  }
}

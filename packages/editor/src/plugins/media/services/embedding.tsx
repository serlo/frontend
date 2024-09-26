import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import { GeogebraRenderer } from './geogebra'
import { ImageRenderer } from './html-image'
import { VideoRenderer } from './html-video'
import { resolveEmbedding } from './resolve-embedding'
import { Embed, Resource, ResourceResolverResult } from './types'
import { YoutubeRenderer } from './youtube'
import { FaIcon } from '@/components/fa-icon'

export function Embedding({ resource }: { resource: Resource }) {
  const embeddingComputation = resolveEmbedding(resource)
  const embeddingComputationIsPromise = embeddingComputation instanceof Promise

  const [embeddingResult, setEmbeddingResult] =
    useState<ResourceResolverResult | null>(
      embeddingComputationIsPromise ? null : embeddingComputation
    )

  useEffect(() => {
    if (embeddingComputationIsPromise) {
      void (async () => setEmbeddingResult(await embeddingComputation))()
    }
  }, [embeddingComputation, embeddingComputationIsPromise])

  if (embeddingResult === null) {
    // TODO: Design spinner
    return (
      <div className="flex min-h-32 w-full items-center justify-center rounded-b bg-orange-100">
        <FaIcon icon={faSpinner} className="mr-2 animate-spin-slow" />
        Loading...
      </div>
    )
  }

  if (embeddingResult.type === 'error') {
    // TODO: Proper design
    return (
      <div className="flex min-h-32 w-full items-center justify-center rounded-b bg-red-100">
        Error while loading resource: {embeddingResult.message}
      </div>
    )
  }

  const embedding = embeddingResult.result

  if (embedding.type === Embed.HTMLImage) {
    return <ImageRenderer {...embedding} />
  } else if (embedding.type === Embed.HTMLVideo) {
    return <VideoRenderer {...embedding} />
  } else if (embedding.type === Embed.GeoGebraApplet) {
    return <GeogebraRenderer {...embedding} />
  } else if (embedding.type === Embed.Youtube) {
    return <YoutubeRenderer {...embedding} />
  }
}

import { GeogebraRenderer } from './geogebra'
import { ImageRenderer } from './html-image'
import { VideoRenderer } from './html-video'
import { resolveEmbedding } from './resolve-embedding'
import { Embed, Resource } from './types'

export function Embedding({ resource }: { resource: Resource }) {
  const embedding = resolveEmbedding(resource)

  if (embedding.type === Embed.HTMLImage) {
    return <ImageRenderer {...embedding} />
  } else if (embedding.type === Embed.HTMLVideo) {
    return <VideoRenderer {...embedding} />
  } else if (embedding.type === Embed.GeoGebraApplet) {
    return <GeogebraRenderer {...embedding} />
  }
}

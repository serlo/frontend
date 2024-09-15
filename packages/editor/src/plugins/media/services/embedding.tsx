import { GeogebraRenderer } from './geogebra'
import { resolveEmbedding } from './resolve-embedding'
import { Embed, Resource } from './types'

export function Embedding({ resource }: { resource: Resource }) {
  const embedding = resolveEmbedding(resource)

  if (embedding.type === Embed.HTMLImage) {
    return <img src={embedding.contentUrl} />
  } else if (embedding.type === Embed.HTMLVideo) {
    return <video src={embedding.contentUrl} controls />
  } else if (embedding.type === Embed.GeoGebraApplet) {
    return <GeogebraRenderer {...embedding} />
  }
}

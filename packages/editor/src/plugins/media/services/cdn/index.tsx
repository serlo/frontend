import { ResourceResolver, Hosting, Embed } from '../types'

export const cdnResourceResolver: ResourceResolver<
  Hosting.CDN,
  Embed.HTMLImage | Embed.HTMLVideo
> = (resource) => {
  return {
    type: resource.embeddingType,
    contentUrl: resource.contentUrl,
  }
}

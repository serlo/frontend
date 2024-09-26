import { ResourceResolver, Hosting, Embed } from '../types'

export const cdnResourceResolver: ResourceResolver<Hosting.CDN> = {
  resolvableEmbeds: [Embed.HTMLImage, Embed.HTMLVideo] as const,
  resolve(resource) {
    return {
      type: 'success',
      result: {
        type: resource.embeddingType,
        contentUrl: resource.contentUrl,
      },
    }
  },
}

import {
  Embed,
  EmbeddingRenderer,
  Hosting,
  ResourceResolver,
  URLResolver,
} from '../types'

export const youtubeResourceResolver: ResourceResolver<Hosting.Youtube> = {
  resolvableEmbeds: [Embed.Youtube] as const,
  resolve(resource) {
    return {
      type: 'success',
      result: {
        type: Embed.Youtube,
        videoId: resource.videoId,
      },
    }
  },
}

export const YoutubeRenderer: EmbeddingRenderer<Embed.Youtube> = ({
  videoId,
}) => {
  return (
    <div className="rounded border bg-green-50">
      Here would be the embedding for Youtube video with id{' '}
      <code>{videoId}</code>
    </div>
  )
}

export const youtubeUrlResolver: URLResolver = {
  resolvableHostings: [Hosting.Youtube] as const,
  resolve(url) {
    if (url.hostname !== 'www.youtube.com') return { type: 'useNextResolver' }

    const videoId = url.searchParams.get('v')

    if (url.pathname.startsWith('/watch') && videoId) {
      return {
        type: 'success',
        result: { hostingService: Hosting.Youtube, videoId },
      }
    } else {
      return { type: 'error', message: 'Invalid Youtube URL' }
    }
  },
}

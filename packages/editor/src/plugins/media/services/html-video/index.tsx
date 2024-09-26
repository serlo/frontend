import { Embed, EmbeddingRenderer, Hosting, URLResolver } from '../types'

const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv']

export const VideoRenderer: EmbeddingRenderer<Embed.HTMLVideo> = ({
  contentUrl,
}) => <video src={contentUrl} controls />

export const videoUrlResolver: URLResolver = {
  resolvableHostings: [Hosting.CDN],
  resolve: (url, signal) => {
    return new Promise((resolve) => {
      // Load the image to check whether the url belongs to an image
      const video = document.createElement('video')

      signal.onabort = () => {
        resolve({ type: 'aborted' })
      }

      video.oncanplay = () => {
        resolve({
          type: 'success',
          result: {
            hostingService: Hosting.CDN,
            embeddingType: Embed.HTMLVideo,
            contentUrl: url.href,
          },
        })
      }

      video.onerror = () => {
        if (videoExtensions.some((ext) => url.pathname.endsWith('.' + ext))) {
          resolve({
            type: 'error',
            message: 'Video konnte nicht geladen werden.',
          })
        } else {
          resolve({ type: 'useNextResolver' })
        }
      }

      video.src = url.href
    })
  },
}

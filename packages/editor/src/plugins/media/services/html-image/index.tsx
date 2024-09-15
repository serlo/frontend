import { EmbeddingRenderer, Embed, URLResolver, Hosting } from '../types'

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']

export const ImageRenderer: EmbeddingRenderer<Embed.HTMLImage> = ({
  contentUrl,
}) => <img src={contentUrl} />

export const imageUrlResolver: URLResolver = {
  resolvableEmbeddings: [Embed.HTMLImage],
  resolve: (url, signal) => {
    return new Promise((resolve) => {
      // Load the image to check whether the url belongs to an image
      const img = new Image()

      signal.onabort = () => {
        resolve({ type: 'aborted' })
      }

      img.onload = () => {
        resolve({
          type: 'resourceFound',
          resource: {
            hostingService: Hosting.CDN,
            embeddingType: Embed.HTMLImage,
            contentUrl: url.href,
          },
        })
      }

      img.onerror = () => {
        if (imageExtensions.some((ext) => url.pathname.endsWith('.' + ext))) {
          resolve({
            type: 'error',
            message: 'Bild konnte nicht geladen werden.',
          })
        } else {
          resolve({ type: 'cannotResolve' })
        }
      }

      img.src = url.href
    })
  },
}

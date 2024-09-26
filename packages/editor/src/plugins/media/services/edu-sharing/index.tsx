import {
  Embed,
  EmbeddingProp,
  Hosting,
  ResourceResolver,
  URLResolver,
} from '../types'

// Let's assume that edusharing can be used for images and videos
const possibleEmbeds = [Embed.HTMLImage, Embed.HTMLVideo] as const
type PossibleEmbed = (typeof possibleEmbeds)[number]

// A simulated list of resources on edusharing
const resourcesOnEdusharing: Record<
  string,
  EmbeddingProp<PossibleEmbed> | undefined
> = {
  '1': {
    type: Embed.HTMLImage,
    contentUrl:
      'https://cdn.pixabay.com/photo/2023/12/11/12/51/lynx-8443540_640.jpg',
  },
  '2': {
    type: Embed.HTMLVideo,
    contentUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
}

// Here we simulate that loading a resource from edusharing takes some time
export const edusharingResourceResolver: ResourceResolver<Hosting.Edusharing> =
  {
    resolvableEmbeds: possibleEmbeds,
    resolve(resource) {
      return new Promise((resolve) => {
        const embed = resourcesOnEdusharing[resource.nodeId]

        setTimeout(() => {
          resolve(
            embed !== undefined
              ? { type: 'success', result: embed }
              : { type: 'error', message: 'Resource not found' }
          )
        }, 3000)
      })
    },
  }

export const edusharingUrlResolver: URLResolver = {
  resolvableHostings: [Hosting.Edusharing],
  resolve(url) {
    if (url.hostname !== 'edu-sharing.net') {
      return { type: 'useNextResolver' }
    }
    if (!url.pathname.startsWith('/')) {
      return { type: 'useNextResolver' }
    }

    const nodeId = url.pathname.slice(1)

    if (nodeId in resourcesOnEdusharing) {
      return {
        type: 'success',
        result: {
          hostingService: Hosting.Edusharing,
          repositoryId: 'edusharing',
          nodeId,
        },
      }
    } else {
      return {
        type: 'error',
        message:
          'Please use http://edu-sharing.org/1 or http://edu-sharing.org/2',
      }
    }
  },
}

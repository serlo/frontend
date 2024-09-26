import { cdnResourceResolver } from './cdn'
import { edusharingResourceResolver } from './edu-sharing'
import { geogebraResourceResolver } from './geogebra'
import { Hosting, Resource } from './types'

export function resolveEmbedding(resource: Resource) {
  switch (resource.hostingService) {
    case Hosting.CDN:
      return cdnResourceResolver.resolve(resource)
    case Hosting.GeoGebra:
      return geogebraResourceResolver.resolve(resource)
    case Hosting.Edusharing:
      return edusharingResourceResolver.resolve(resource)
  }
}

export function getResolvableEmbeds(hostingService: Hosting) {
  switch (hostingService) {
    case Hosting.CDN:
      return cdnResourceResolver.resolvableEmbeds
    case Hosting.GeoGebra:
      return geogebraResourceResolver.resolvableEmbeds
    case Hosting.Edusharing:
      return edusharingResourceResolver.resolvableEmbeds
  }
}

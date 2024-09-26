import { cdnResourceResolver } from './cdn'
import { edusharingResourceResolver } from './edu-sharing'
import { geogebraResourceResolver } from './geogebra'
import { Hosting, Resource } from './types'

export function resolveEmbedding(resource: Resource) {
  switch (resource.hostingService) {
    case Hosting.CDN:
      return cdnResourceResolver(resource)
    case Hosting.GeoGebra:
      return geogebraResourceResolver(resource)
    case Hosting.Edusharing:
      return edusharingResourceResolver(resource)
  }
}

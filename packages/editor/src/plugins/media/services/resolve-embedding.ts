import { cdnResourceResolver } from './cdn'
import { geogebraResourceResolver } from './geogebra'
import { Hosting, Resource } from './types'

export function resolveEmbedding(resource: Resource) {
  switch (resource.hostingService) {
    case Hosting.CDN:
      return cdnResourceResolver(resource)
    case Hosting.GeoGebra:
      return geogebraResourceResolver(resource)
  }
}

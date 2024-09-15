import { cdnResourceResolver } from './cdn'
import { geogebraResourceResolver } from './geogebra'
import { Embedding, Hosting, Resource, ResourceResolver } from './types'

const resourceResolvers: ResourceResolvers = {
  [Hosting.GeoGebra]: geogebraResourceResolver,
  [Hosting.CDN]: cdnResourceResolver,
}

type ResourceResolvers = { [H in Hosting]: ResourceResolver<H> }

export function resolveEmbedding(resource: Resource) {
  const resolveFunc = resourceResolvers[resource.hostingService] as (
    resource: Resource
  ) => Embedding

  return resolveFunc(resource)
}
